from ultralytics import YOLO

model = YOLO('yolov8m.pt')

results = model.predict('data/italyGame.mp4', save=True)
print(results[0])
print("---------------------------------")
for box in results[0].boxes:
    print(box)
