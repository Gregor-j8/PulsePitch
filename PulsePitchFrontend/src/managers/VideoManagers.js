import axios from "axios"

export const postVideo = async (formData) => {
    if (!formData) {
        return
    }
const response = await axios.post("http://localhost:8000/upload_video", formData)
return response
}