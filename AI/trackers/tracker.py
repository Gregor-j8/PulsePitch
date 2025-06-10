import cv2
import numpy as np
from ultralytics import YOLO
import supervision as sv
from utils import get_bbox_width, get_center_of_bbox
import pandas as pd


class TrackerRealtime:
    def __init__(self, model_path):
        self.model = YOLO(model_path)
        self.tracker = sv.ByteTrack()
        self.current_tracks = {"players": {}, "referees": {}, "ball": {}}
        self.cls_names = None
        self.cls_names_inv = None
        self.initialized = False
        
    # def interpolate_ball_positions(self, ball_positions):
    #     ball_positions = [x.get(1, {}).get('bbox', []) for x in ball_positions]
    #     df_ball_positions = pd.DataFrame(ball_positions, columns=['x1', 'y1', 'x2', 'y2'])
    #     df_ball_positions = df_ball_positions.interpolate()
    #     df_ball_positions = df_ball_positions.bfill()
    #     ball_positions = [{1: {"bbox": x}} for x in df_ball_positions.to_numpy().tolist()]
            
    #     return ball_positions

    def detect_and_track(self, frame):
        results = self.model.predict(frame, conf=0.3, verbose=False)
        detection_supervision = sv.Detections.from_ultralytics(results[0])

        if self.cls_names is None:
            self.cls_names = results[0].names
            self.cls_names_inv = {v:k for k,v in self.cls_names.items()}

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
                self.current_tracks["players"][track_id] = {"bbox": bbox}
            elif cls_name == "referee":
                self.current_tracks["referees"][track_id] = {"bbox": bbox}

        for det in detection_supervision:
            bbox = det[0].tolist()
            cls_id = det[3]
            cls_name = self.cls_names[cls_id]
            if cls_name == "ball":
                self.current_tracks["ball"][1] = {"bbox": bbox}

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
        if track_id is not None:
            rect_w, rect_h = 40, 20
            x1 = x_center - rect_w // 2
            x2 = x_center + rect_w // 2
            y1 = (y2 - rect_h // 2) + 15
            y2_ = (y2 + rect_h // 2) + 15
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2_)), color, cv2.FILLED)
            x1_text = x1 + 12 - (10 if track_id > 99 else 0)
            cv2.putText(frame, str(track_id), (int(x1_text), int(y1 + 15)),
                        cv2.FONT_HERSHEY_COMPLEX, 0.6, (0, 0, 0), 2)
        return frame

    def draw_triangle(self, frame, bbox, color):
        y = int(bbox[1])
        x, _ = get_center_of_bbox(bbox)
        pts = np.array([[x, y], [x - 10, y - 20], [x + 10, y + 20]])
        cv2.drawContours(frame, [pts], 0, color, cv2.FILLED)
        cv2.drawContours(frame, [pts], 0, (0, 0, 0), 2)
        return frame

    def annotate_frame(self, frame, tracks):
        for track_id, player in tracks.get("players", {}).items():
            color = player.get("team_color", (255, 0, 0))
            frame = self.draw_ellipse(frame, player["bbox"], color, track_id)

        for referee in tracks.get("referees", {}).values():
            frame = self.draw_ellipse(frame, referee["bbox"], (0, 255, 255))

        for ball in tracks.get("ball", {}).values():
            frame = self.draw_triangle(frame, ball["bbox"], (0, 255, 0))

        return frame
