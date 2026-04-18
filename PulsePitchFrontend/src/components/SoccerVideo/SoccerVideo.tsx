import { useState, useRef, useEffect } from "react"
import {X} from "lucide-react"
import { useVideo } from "../../hooks/useVideo"

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [playing, setPlaying] = useState<boolean>(true)
  const [streamFrame, setStreamFrame] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const playingRef = useRef<boolean>(playing)
  const ws = useRef<WebSocket | null>(null)
  const mutate = useVideo()

  useEffect(() => {
  playingRef.current = playing
}, [playing])

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    mutate.mutate(formData, {
      onSuccess: (result) => {
        if (result?.data.message === "Video uploaded successfully") {
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
  <div style={{padding: '3rem 1rem'}}>
  <div style={{maxWidth: '576px', margin: '0 auto', padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#111827'}}>
      <h2 className="text-2xl font-semibold text-center">Video Analysis</h2>
      <input type="file" accept="video/*"
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        onChange={(e) => {setFile(e.target.files?.[0] ?? null); setStreamFrame(null)}}/>
      {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
      <button onClick={handleUpload} disabled={uploading || !file} style={{width: '100%', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 500, color: '#fff', background: uploading || !file ? '#9ca3af' : '#2563eb', cursor: uploading || !file ? 'not-allowed' : 'pointer', border: 'none'}}>
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
  </div>
  )
}