import axios from "axios"

export const postVideo = async (formData) => {
    if (!formData) {
        console.log("no video recieved for post")
        return
    }
const response = await axios.post("http://localhost:8000/upload_video", formData)
return response
}