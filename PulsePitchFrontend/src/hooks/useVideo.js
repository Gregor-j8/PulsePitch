import { postVideo } from "../managers/VideoManagers"
import { useMutation } from '@tanstack/react-query'

export const useVideo = () => {
    return useMutation({
        mutationFn: (formData) => postVideo(formData),
        queryKey: ['video']
    })
}