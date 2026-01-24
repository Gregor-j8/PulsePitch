import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { fetchTeams, fetchTeamById, createTeam, editTeam, deleteTeam, JoinTeam } from '../managers/TeamManagers';
import { TeamDTO, JoinTeamDTO, EditTeamDTO } from '../types';

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
