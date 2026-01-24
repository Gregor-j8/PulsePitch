import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import {fetchUserMessages, fetchMessagesByRoomId, createMessages, editMessage, deleteMessageRoom, deleteMessageById,} from '../managers/MessageManager';
import { MessageDTO, EditMessageDTO } from '../types';

export const useUserMessages = (userId?: number): UseQueryResult<MessageDTO[], Error> => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: () => fetchUserMessages(userId!),
    enabled: !!userId,
  });
};

export const useRoomMessages = (roomId?: number): UseQueryResult<MessageDTO[], Error> => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => fetchMessagesByRoomId(roomId!),
    enabled: !!roomId,
    refetchInterval: 10000
  });
};

export const useCreateMessage = (): UseMutationResult<MessageDTO, Error, Partial<MessageDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

interface EditMessageVariables {
  id: number;
  messageData: EditMessageDTO;
}

export const useEditMessage = (): UseMutationResult<MessageDTO, Error, EditMessageVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, messageData }: EditMessageVariables) => editMessage(id, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

export const useDeleteMessageById = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessageById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

export const useDeleteMessageRoom = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessageRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
