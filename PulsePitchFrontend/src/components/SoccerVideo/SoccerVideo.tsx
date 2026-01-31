// @ts-nocheck
import { useState, useRef, useEffect } from "react"
import {X} from "lucide-react"
import { useVideo } from "../../hooks/useVideo"

export default function VideoUploader() {
  const [file, setFile] = useState(null)
  const [playing, setPlaying] = useState(true)
  const [streamFrame, setStreamFrame] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const playingRef = useRef(playing)
  const ws = useRef(null)
  const mutate = useVideo()

  useEffect(() => {
  playingRef.current = playing
}, [playing])

  const handleUpload = async () => {
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    mutate.mutate(formData, {
      onSuccess: (result) => {
        if (result.data.message === "Video uploaded successfully") {
          setShowModal(true)
          startWebSocket()
        }
      }
    })
  }

  const startWebSocket = () => {
    if (ws.current) return
    ws.current = new WebSocket("ws://localhost:8000/ws/video")
    ws.current.onmessage = (event) => {
      if(playingRef.current) {
        const imageData = event.data
        const imageSrc = `data:image/jpeg;base64,${imageData}`
        setStreamFrame(imageSrc)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  return (
  <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6 text-gray-900">
      <h2 className="text-2xl font-semibold text-center">Video Analysis</h2>
      <input type="file" accept="video/*"
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        onChange={(e) => {setFile(e.target.files[0]); setStreamFrame(null)}}/>
      {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
      <button onClick={handleUpload} disabled={uploading || !file} className={`w-full py-2 px-4 rounded-lg font-medium text-white 
        ${uploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {uploading ? "Uploading..." : "Upload & Stream"}
      </button>
      {showModal && streamFrame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full z-50">
          <div className="bg-white p-10 rounded-xl max-w-4xl w-full relative shadow-lg">
            <button onClick={() => {setShowModal(false); setUploading(false)}} className="absolute mb-10 top-3 right-3 text-gray-500 hover:text-black text-xl">
              <X/>
            </button>
             <button onClick={() => setPlaying(!playing)}>
                {playing ? "Pause" : "Play"}
             </button>
            <img src={streamFrame} alt="Video Frame" className="w-full rounded-lg"/>
          </div>
        </div>
      )}
    </div>
  )
}