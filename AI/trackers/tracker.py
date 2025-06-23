import cv2
import numpy as np
from ultralytics import YOLO
import supervision as sv
from utils import get_bbox_width, get_center_of_bbox
import pandas as pd
from itertools import combinations
from collections import defaultdict
from itertools import combinations

class TrackerRealtime:
    def __init__(self, model_path):
        self.model = YOLO(model_path)
        self.tracker = sv.ByteTrack()
        self.current_tracks = {"players": {}, "referees": {}, "ball": {}}
        self.cls_names = None
        self.cls_names_inv = None
        self.initialized = False
        self.frame_count = 0
        self.player_history = {}
        self.history_length = 5

    def interpolate_ball_positions(self, tracks_list):
        ball_positions = []
        for frame_tracks in tracks_list:
            ball = frame_tracks.get("ball", {}).get(1, {}).get("bbox", None)
            ball_positions.append(ball if ball else [np.nan] * 4)

        df = pd.DataFrame(ball_positions, columns=['x1', 'y1', 'x2', 'y2'])
        df = df.interpolate().bfill().ffill()
        smoothed_positions = df.to_numpy().tolist()

        for i, frame_tracks in enumerate(tracks_list):
            frame_tracks["ball"][1] = {"bbox": smoothed_positions[i]}

        return tracks_list

    def detect_and_track(self, frame):
        self.frame_count += 1
        results = self.model.predict(frame, conf=0.3, verbose=False)
        detection_supervision = sv.Detections.from_ultralytics(results[0])

        if self.cls_names is None:
            self.cls_names = results[0].names
            self.cls_names_inv = {v: k for k, v in self.cls_names.items()}

        for i, class_id in enumerate(detection_supervision.class_id):
            if self.cls_names[class_id] == 'goalkeeper':
                detection_supervision.class_id[i] = self.cls_names_inv['player']

        tracked_objects = self.tracker.update_with_detections(detection_supervision)
        self.current_tracks = {"players": {}, "referees": {}, "ball": {}}

        for det in tracked_objects:
            bbox = det[0].tolist()
            cls_id = det[3]
            track_id = det[4]
            cls_name = self.cls_names[cls_id]

            if cls_name == "player":
                if track_id not in self.player_history:
                    self.player_history[track_id] = []
                self.player_history[track_id].append(bbox)
                if len(self.player_history[track_id]) > self.history_length:
                    self.player_history[track_id] = self.player_history[track_id][-self.history_length:]
                smoothed_bbox = np.mean(self.player_history[track_id], axis=0).tolist()
                self.current_tracks["players"][track_id] = {"bbox": smoothed_bbox}

            elif cls_name == "referee":
                self.current_tracks["referees"][track_id] = {"bbox": bbox}

        for det in detection_supervision:
            bbox = det[0].tolist()
            cls_id = det[3]
            cls_name = self.cls_names[cls_id]
            if cls_name == "ball":
                self.current_tracks["ball"][1] = {"bbox": bbox}
        if not hasattr(self, 'team_assigner'):
            from team_assigner import TeamAssigner
            self.team_assigner = TeamAssigner()
        if self.frame_count % 30 == 0:
            self.team_assigner.assign_team_color(frame, self.current_tracks["players"], self.frame_count)

        for player_id, player in self.current_tracks["players"].items():
            team = self.team_assigner.get_player_teams(frame, player["bbox"], player_id, self.frame_count)
            player["team"] = team
            if team == 1:
                player["team_color"] = (255, 0, 0)
            elif team == 2:
                player["team_color"] = (0, 0, 255)
            else:
                player["team_color"] = (128, 128, 128)
        return self.current_tracks

    def draw_ellipse(self, frame, bbox, color, track_id=None):
        y2 = int(bbox[3])
        x_center, _ = get_center_of_bbox(bbox)
        width = get_bbox_width(bbox)
        cv2.ellipse(
            frame,
            center=(x_center, y2),
            axes=(int(width), int(0.35 * width)),
            angle=0.0,
            startAngle=-45,
            endAngle=235,
            color=color,
            thickness=2,
        )
        return frame

    def draw_triangle(self, frame, bbox, color):
        y = int(bbox[1])
        x, _ = get_center_of_bbox(bbox)
        pts = np.array([[x, y], [x - 1, y - 2], [x + 1, y + 2]])
        cv2.drawContours(frame, [pts], 0, color, cv2.FILLED)
        cv2.drawContours(frame, [pts], 0, (0, 0, 0), 2)
        return frame

    def draw_team_lines(self, frame, players):

        team_centers = defaultdict(list)
        id_to_center = {}

        for player_id, player in players.items():
            team_id = player.get("team")
            if team_id not in [1, 2]:
                continue

            bbox = player["bbox"]
            x = int((bbox[0] + bbox[2]) / 2)
            y = int((bbox[1] + bbox[3]) / 2)

            team_centers[team_id].append((player_id, (x, y)))
            id_to_center[player_id] = (x, y)

        for team_id, players_with_pos in team_centers.items():
            color = (255, 0, 0) if team_id == 1 else (0, 0, 255)
            for i, (player_id, center) in enumerate(players_with_pos):
                distances = []
                for other_id, other_center in players_with_pos:
                    if other_id == player_id:
                        continue
                    dist = np.linalg.norm(np.array(center) - np.array(other_center))
                    distances.append((dist, other_center))
                distances.sort()
                closest = distances[:3]

                for _, teammate_center in closest:
                    cv2.line(frame, center, teammate_center, color, 2)

        return frame

    def annotate_frame(self, frame, tracks):
        frame = self.draw_team_lines(frame, tracks.get("players", {}))

        for track_id, player in tracks.get("players", {}).items():
            color = player.get("team_color", (255, 0, 0))
            frame = self.draw_ellipse(frame, player["bbox"], color, track_id)

        for referee in tracks.get("referees", {}).values():
            frame = self.draw_ellipse(frame, referee["bbox"], (0, 255, 255))

        for ball in tracks.get("ball", {}).values():
            frame = self.draw_triangle(frame, ball["bbox"], (0, 255, 0))
        return frame