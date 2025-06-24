import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {fetchUserMessages, fetchMessagesByRoomId, createMessages, editMessage, deleteMessageRoom, deleteMessageById,} from '../managers/MessageManager'

export const useUserMessages = (userId) => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: () => fetchUserMessages(userId),
    enabled: !!userId,
  })
}

export const useRoomMessages = (roomId) => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => fetchMessagesByRoomId(roomId),
    enabled: !!roomId,
    refetchInterval: 10000
  })
}

export const useCreateMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export const useEditMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, messageData }) => editMessage(id, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export const useDeleteMessageById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMessageById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export const useDeleteMessageRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMessageRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}