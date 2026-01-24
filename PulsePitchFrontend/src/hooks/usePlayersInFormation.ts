import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { createPlayersinformation, deletePlayersinformation, editPlayersinformation, fetchPlayerByFormationId, fetchPlayersinformationsById } from '../managers/PlayersInFormationManager';
import { PlayersInFormationDTO } from '../types';

export const usePlayersInFormations = (id?: number): UseQueryResult<PlayersInFormationDTO, Error> => {
  return useQuery({
    queryKey: ['PlayersInFormations', id],
    queryFn: () => fetchPlayersinformationsById(id!),
    enabled: !!id
  });
};

export const usePlayersByFormationId = (id?: number): UseQueryResult<PlayersInFormationDTO[], Error> => {
  return useQuery({
    queryKey: ['PlayersInFormations', id],
    queryFn: () => fetchPlayerByFormationId(id!),
    enabled: !!id
  });
};

export const useCreatePlayersInFormations = (): UseMutationResult<PlayersInFormationDTO, Error, Partial<PlayersInFormationDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlayersinformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] });
    },
  });
};

export const useEditPlayersInFormations = (): UseMutationResult<PlayersInFormationDTO, Error, PlayersInFormationDTO> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlayersInFormationDTO) => editPlayersinformation(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] });
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations', variables.id] });
    },
  });
};

export const useDeletePlayersInFormations = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayersinformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] });
    }
  });
};
