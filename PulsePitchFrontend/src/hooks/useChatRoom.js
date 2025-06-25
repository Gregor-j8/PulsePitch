import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchChatRooms, createChatRoom, deleteChatRoom } from '../managers/ChatRoomManager'

export const useChatRooms = (userId) => {
  return useQuery({
    queryKey: ['chatRooms', userId],
    queryFn: () => fetchChatRooms(userId),
    enabled: !!userId,
  })
}

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['chatRooms'])
    },
  })
}

export const useDeleteChatRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(['chatRooms'])
    },
  })
}