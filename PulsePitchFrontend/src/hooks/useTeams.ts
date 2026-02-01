import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { fetchTeams, fetchTeamById, createTeam, editTeam, deleteTeam, JoinTeam, fetchPublicTeams, searchPublicTeams, requestJoinTeam, fetchPendingJoinRequests, respondToJoinRequest } from '../managers/TeamManagers';
import { TeamDTO, JoinTeamDTO, EditTeamDTO, PublicTeamSearchDTO, JoinRequestDTO, JoinRequestResponseDTO, PendingJoinRequestDTO } from '../types';

export const useTeams = (): UseQueryResult<TeamDTO[], Error> => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });
};

export const useTeam = (id?: number): UseQueryResult<TeamDTO, Error> => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => fetchTeamById(id!),
    enabled: !!id,
  });
};

export const useCreateTeam = (): UseMutationResult<TeamDTO, Error, Partial<TeamDTO>> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};

interface EditTeamVariables {
  id: number;
  data: EditTeamDTO;
}

export const useEditTeam = (): UseMutationResult<TeamDTO, Error, EditTeamVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditTeamVariables) => editTeam(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team', variables.id] });
    },
  });
};

export const useDeleteTeam = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};

export const useJoinTeam = (): UseMutationResult<void, Error, JoinTeamDTO> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: JoinTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};

export const usePublicTeams = (): UseQueryResult<PublicTeamSearchDTO[], Error> => {
  return useQuery({
    queryKey: ['teams', 'public'],
    queryFn: fetchPublicTeams,
  });
};

export const useSearchPublicTeams = (searchTerm: string): UseQueryResult<PublicTeamSearchDTO[], Error> => {
  return useQuery({
    queryKey: ['teams', 'public', 'search', searchTerm],
    queryFn: () => searchPublicTeams(searchTerm),
    enabled: searchTerm.length >= 2,
  });
};

export const useRequestJoinTeam = (): UseMutationResult<
  { status: string; message: string },
  Error,
  JoinRequestDTO
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestJoinTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['playerteams'] });
    },
  });
};

export const usePendingJoinRequests = (teamId?: number): UseQueryResult<PendingJoinRequestDTO[], Error> => {
  return useQuery({
    queryKey: ['teams', teamId, 'pending-requests'],
    queryFn: () => fetchPendingJoinRequests(teamId!),
    enabled: !!teamId,
  });
};

export const useRespondToJoinRequest = (): UseMutationResult<
  { status: string; message: string },
  Error,
  { playerTeamId: number; response: JoinRequestResponseDTO }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ playerTeamId, response }) => respondToJoinRequest(playerTeamId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['playerteams'] });
    },
  });
};
