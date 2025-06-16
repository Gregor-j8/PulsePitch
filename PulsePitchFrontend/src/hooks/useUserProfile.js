import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUserProfile, editUserProfile, fetchUserProfileById } from "../managers/UserProfile"

export const useUserProile = (id) => {
  return useQuery({
    queryKey: ['userprofile', id],
    queryFn: () => fetchUserProfileById(id),
    enabled: !!id,
  })
}

export const useEditUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editUserProfile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userprofiles'] })
      queryClient.invalidateQueries({ queryKey: ['userprofile', variables.id] })
    },
  })
}

export const useDeleteUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUserProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userprofiles'] })
    },
  })
}
