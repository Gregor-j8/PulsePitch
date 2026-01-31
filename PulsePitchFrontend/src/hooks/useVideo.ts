import { postVideo } from "../managers/VideoManagers"
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useVideo = () => {
    return useMutation<AxiosResponse | undefined, Error, FormData>({
        mutationFn: (formData: FormData) => postVideo(formData),
        mutationKey: ['video']
    })
}