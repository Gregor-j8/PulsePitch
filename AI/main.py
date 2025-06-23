import base64
import asyncio
import cv2
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import io
import av
import numpy as np
from team_assigner import TeamAssigner
from trackers.tracker import TrackerRealtime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

video_bytes_buffer = None

async def encode_frame(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    frame_bytes = buffer.tobytes()
    return base64.b64encode(frame_bytes).decode('utf-8')

@app.post("/upload_video")
async def upload_file(file: UploadFile = File(...)):
    global video_bytes_buffer
    video_bytes_buffer = await file.read()
    return {"message": "Video uploaded successfully"}

@app.websocket("/ws/video")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    if not video_bytes_buffer:
        await websocket.send_text("Error: No video uploaded")
        await websocket.close()
        return

    container = av.open(io.BytesIO(video_bytes_buffer))
    video_stream = container.streams.video[0]
    fps = float(video_stream.average_rate or 24)

    tracker = TrackerRealtime("models/best.pt")
    team_assigner = TeamAssigner()
    teams_assigned = False

    frame_id = 0
    for frame in container.decode(video=0):
        if frame_id % 4 != 0:
            frame_id += 1
            continue

        img = frame.to_ndarray(format="bgr24")
        tracks = tracker.detect_and_track(img)

        if not teams_assigned and len(tracks["players"]) > 2:
            team_assigner.assign_team_color(img, tracks["players"], frame_count=frame_id)
            teams_assigned = True

        if teams_assigned:
            for player_id, player in tracks["players"].items():
                team = team_assigner.get_player_teams(img, player["bbox"], player_id, frame_count=frame_id)
                color = team_assigner.team_colors.get(team, (255, 255, 255))
                tracks["players"][player_id]["team"] = team
                tracks["players"][player_id]["team_color"] = tuple(int(c) for c in color)

        annotated = tracker.annotate_frame(img, tracks)
        encoded = await encode_frame(annotated)
        await websocket.send_text(encoded)
        await asyncio.sleep(1 / (fps / 4))
        frame_id += 1