import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { fetchUserMatchRequest, fetchMatchRequestByRoomId, createMatchRequest, editMatchRequest, createMatchResponse, deleteMatchRequest} from '../managers/MatchRequestManager';
import { MatchRequestDTO, CreateMatchRequestDTO, MatchResponseDTO } from '../types';

export const useUserMatchRequests = (userId?: number): UseQueryResult<MatchRequestDTO[], Error> => {
  return useQuery({
    queryKey: ['matchrequests', userId],
    queryFn: () => fetchUserMatchRequest(userId!),
    enabled: userId !== undefined && userId !== null,
  });
};

export const useMatchRequestByRoom = (roomId?: number): UseQueryResult<MatchRequestDTO, Error> => {
  return useQuery({
    queryKey: ['matchrequests', roomId],
    queryFn: () => fetchMatchRequestByRoomId(roomId!),
    enabled: !!roomId,
    refetchInterval: 5000
  });
};

export const useCreateMatchRequest = (): UseMutationResult<MatchRequestDTO, Error, CreateMatchRequestDTO> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};

interface EditMatchRequestVariables {
  id: number;
  messageData: Partial<MatchRequestDTO>;
}

export const useEditMatchRequest = (): UseMutationResult<MatchRequestDTO, Error, EditMatchRequestVariables> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, messageData }: EditMatchRequestVariables) => editMatchRequest(id, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};

interface RespondToMatchRequestVariables {
  matchId: number;
  messageData: MatchResponseDTO;
}

export const useRespondToMatchRequest = (): UseMutationResult<MatchRequestDTO, Error, RespondToMatchRequestVariables> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matchId, messageData }: RespondToMatchRequestVariables) => createMatchResponse(matchId, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};

export const useDeleteMatchRequest = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};
