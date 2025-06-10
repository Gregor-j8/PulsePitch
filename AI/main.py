import base64
import asyncio
import cv2
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import io
import av
import numpy as np
from starlette.websockets import WebSocket
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

def process_video_frames(video_frames):
    tracker = TrackerRealtime('models/best.pt')
    tracks = [tracker.detect_and_track(frame) for frame in video_frames]
    tracks["ball"] = TrackerRealtime.interpolate_ball_positions(tracks["ball"])

    team_assigner = TeamAssigner()
    team_assigner.assign_team_color(video_frames[0], tracks['players'][0])

    for frame_num, player_track in enumerate(tracks['players']):
        for player_id, track in player_track.items():
            team = team_assigner.get_player_teams(video_frames[frame_num], track['bbox'], player_id)
            track['team'] = team
            track['team_color'] = team_assigner.team_colors[team]

    output_frames = TrackerRealtime.draw_annotations(video_frames, tracks)
    return output_frames

@app.websocket("/ws/video")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    if not video_bytes_buffer:
        await websocket.send_text("Error: No video uploaded")
        await websocket.close()
        return

    try:
        container = av.open(io.BytesIO(video_bytes_buffer))
        video_stream = container.streams.video[0]
        video_stream.thread_type = "AUTO"

        fps = float(video_stream.average_rate) if video_stream.average_rate else 24.0
        frame_id = 0
        tracker = TrackerRealtime("models/best.pt")
        for frame in container.decode(video=0):
            if frame_id % 4 == 0:
                img = frame.to_ndarray(format="bgr24")
                tracks = tracker.detect_and_track(img)
                annotated = tracker.annotate_frame(img, tracks)
                encoded = await encode_frame(annotated)
                await websocket.send_text(encoded)
                await asyncio.sleep(1 / (fps / 3))
            frame_id += 1

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"Error during video stream: {e}")
    finally:
        await websocket.close()