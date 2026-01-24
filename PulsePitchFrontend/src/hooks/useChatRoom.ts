import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { fetchChatRooms, createChatRoom, deleteChatRoom } from '../managers/ChatRoomManager';
import { ChatRoomDTO } from '../types';

export const useChatRooms = (userId?: number): UseQueryResult<ChatRoomDTO[], Error> => {
  return useQuery({
    queryKey: ['chatRooms', userId],
    queryFn: () => fetchChatRooms(userId!),
    enabled: !!userId,
  });
};

export const useCreateChatRoom = (): UseMutationResult<ChatRoomDTO, Error, Partial<ChatRoomDTO>> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
  });
};

export const useDeleteChatRoom = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
  });
};
