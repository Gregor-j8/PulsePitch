import { useState, useRef, useEffect } from "react";

export default function VideoUploader() {
  const [file, setFile] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [streamFrame, setStreamFrame] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const ws = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a video file.");
      return;
    }
    console.log("uploaded")
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/upload_video", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result)
      if (result.message === "Video uploaded successfully") {
          console.log("websocket on")
        setVideoUploaded(true);
        startWebSocket();
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

  const startWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8000/ws/video");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const imageData = event.data;
      const imageSrc = `data:image/jpeg;base64,${imageData}`;
      console.log("stream frame", imageSrc)
      setStreamFrame(imageSrc);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Streaming error occurred.");
    };
  };

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "4rem" }}>
      <h2>Video Uploader</h2>
      <input
        type="file"
        aria-controls="controls"
        accept="video/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setError("");
          setStreamFrame(null);
          setVideoUploaded(false);
        }}
      />

      {file && <p>Selected: {file.name}</p>}

      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload & Stream"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {streamFrame && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Streaming Annotated Video</h3>
          <img src={streamFrame} alt="Video Frame" width="1000" />
        </div>
      )}
    </div>
  );
}