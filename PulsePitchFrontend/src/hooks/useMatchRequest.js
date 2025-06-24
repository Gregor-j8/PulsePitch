import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserMatchRequest, fetchMatchRequestByRoomId, createMatchRequest, editMatchRequest, createMatchResponse, deleteMatchRequest} from '../managers/MatchRequestManager'

export const useUserMatchRequests = (userId) => {
  return useQuery({
    queryKey: ['matchrequests', userId],
    queryFn: () => fetchUserMatchRequest(userId),
    enabled: !!userId,
  })
}

export const useMatchRequestByRoom = (roomId) => {
  return useQuery({
    queryKey: ['matchrequests', roomId],
    queryFn: () => fetchMatchRequestByRoomId(roomId),
    enabled: !!roomId,
  })
}

export const useCreateMatchRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};

export const useEditMatchRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, messageData }) => editMatchRequest(id, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] });
    },
  });
};

export const useRespondToMatchRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ matchId, messageData }) => createMatchResponse(matchId, messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] })
    },
  })
}

export const useDeleteMatchRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteMatchRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matchrequests'] })
    },
  })
}