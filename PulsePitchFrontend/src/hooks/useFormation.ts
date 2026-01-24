import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { createFormations, deleteFormations, editFormations, fetchFormationsById, fetchFormationsByTeamId } from '../managers/FormationManager';
import { FormationsDTO, EditFormationsDTO } from '../types';

export const useGetFormationsByTeamId = (teamIds: number): UseQueryResult<FormationsDTO[], Error> => {
  return useQuery({
    queryKey: ['formations', teamIds],
    queryFn: () => fetchFormationsByTeamId(teamIds),
    enabled: !!teamIds,
  });
};

export const useGetFormationsById = (id?: number): UseQueryResult<FormationsDTO, Error> => {
  return useQuery({
    queryKey: ['formations', id],
    queryFn: () => fetchFormationsById(id!),
    enabled: !!id
  });
};

export const useCreateFormations = (): UseMutationResult<FormationsDTO, Error, Partial<FormationsDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFormations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    },
  });
};

interface EditFormationsVariables {
  id: number;
  data: EditFormationsDTO;
}

export const useEditFormations = (): UseMutationResult<FormationsDTO, Error, EditFormationsVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditFormationsVariables) => editFormations(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['formations', variables.id] });
    },
  });
};

export const useDeleteFormations = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFormations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
    }
  });
};
