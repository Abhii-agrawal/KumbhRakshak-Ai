import os
import logging

logger = logging.getLogger("crowdshield.yolo")

model = None
cv2 = None

try:
    import cv2
    from ultralytics import YOLO
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'yolov8n.pt')
    if not os.path.exists(model_path):
        model_path = 'yolov8n.pt'
    if os.path.exists(model_path):
        model = YOLO(model_path)
        logger.info("Loaded YOLOv8 model successfully")
except Exception as e:
    logger.warning(f"YOLO/OpenCV not fully initialized (running in simulation mode): {e}")

def detect_events(frame):
    if model is None:
        return []
    try:
        results = model.predict(source=frame, verbose=False)
        alerts = []
        for r in results:
            for det in r.boxes:
                cls_id = int(det.cls[0])
                if cls_id in [1, 2]:  # class 1=fight, 2=theft
                    alerts.append({"type": "violence", "coords": det.xyxy[0].tolist()})
        return alerts
    except Exception as e:
        logger.debug(f"Event detection error: {e}")
        return []

# Real-time detection from camera
def camera_stream(video_source=0):
    if cv2 is None or model is None:
        return
    try:
        cap = cv2.VideoCapture(video_source)
        if not cap.isOpened():
            logger.info("No camera found or accessible at source %s", video_source)
            return
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            alerts = detect_events(frame)
            yield frame, alerts
        cap.release()
    except Exception as e:
        logger.warning(f"Camera stream closed: {e}")
        return
