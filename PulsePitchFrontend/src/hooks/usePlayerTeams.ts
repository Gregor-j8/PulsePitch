import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import {fetchPlayerTeams, fetchPlayerTeamById, createPlayerTeam, editPlayerTeam, deletePlayerTeam, getCurrentPlayerTeams} from '../managers/PlayerTeamManagers';
import { PlayerTeamDTO, GetTeamsByPlayerIdDTO } from '../types';
import { AxiosResponse } from 'axios';

export const usePlayerTeams = (): UseQueryResult<PlayerTeamDTO[], Error> => {
  return useQuery({
    queryKey: ['playerTeams'],
    queryFn: fetchPlayerTeams,
  });
};

export const useGetPlayersFromTeam = (id?: number): UseQueryResult<PlayerTeamDTO, Error> => {
  return useQuery({
    queryKey: ['playerTeam', id],
    queryFn: () => fetchPlayerTeamById(id!),
    enabled: !!id,
  });
};

export const useCurrentPlayerTeam = (id?: number): UseQueryResult<AxiosResponse<GetTeamsByPlayerIdDTO[]>, Error> => {
  return useQuery({
    queryKey: ['playerTeam', id],
    queryFn: () => getCurrentPlayerTeams(id!),
    enabled: !!id,
  });
};

export const useCreatePlayerTeam = (): UseMutationResult<PlayerTeamDTO, Error, Partial<PlayerTeamDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlayerTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerTeams'] });
    },
  });
};

interface EditPlayerTeamVariables {
  id: number;
  data: Partial<PlayerTeamDTO>;
}

export const useEditPlayerTeam = (): UseMutationResult<PlayerTeamDTO, Error, EditPlayerTeamVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditPlayerTeamVariables) => editPlayerTeam(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['playerTeams'] });
      queryClient.invalidateQueries({ queryKey: ['playerTeam', variables.id] });
    },
  });
};

export const useDeletePlayerTeam = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayerTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerTeam'] });
    },
  });
};
