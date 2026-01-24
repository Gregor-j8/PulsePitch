import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { createTeamGame, deleteTeamGame, editTeamGame, fetchTeamGameByTeamId, fetchTeamGamesById } from '../managers/GamesManager';
import { TeamGameDTO } from '../types';

export const useTeamGames = (home: boolean, teamIds: number[]): UseQueryResult<TeamGameDTO[], Error> => {
  return useQuery({
    queryKey: ['teamgame', teamIds],
    queryFn: () => fetchTeamGameByTeamId(home, teamIds),
    enabled: teamIds.length > 0,
  });
};

export const useTeamGame = (id?: number): UseQueryResult<TeamGameDTO, Error> => {
  return useQuery({
    queryKey: ['teamgame', id],
    queryFn: () => fetchTeamGamesById(id!),
    enabled: !!id
  });
};

export const useCreateTeamGame = (): UseMutationResult<TeamGameDTO, Error, Partial<TeamGameDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeamGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] });
    },
  });
};

interface EditTeamGameVariables {
  id: number;
  data: Partial<TeamGameDTO>;
}

export const useEditTeamGame = (): UseMutationResult<TeamGameDTO, Error, EditTeamGameVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditTeamGameVariables) => editTeamGame(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] });
      queryClient.invalidateQueries({ queryKey: ['teamgame', variables.id] });
    },
  });
};

export const useDeleteTeamGame = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] });
    }
  });
};
