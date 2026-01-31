import axios, { AxiosResponse } from "axios"

export const postVideo = async (formData: FormData): Promise<AxiosResponse | undefined> => {
    if (!formData) {
        return
    }
const response = await axios.post("http://localhost:8000/upload_video", formData)
return response
}