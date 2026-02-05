import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import * as api from '../managers/WalkthroughPlannerManager';
import { WalkthroughPlannerDTO } from '../types';

export const useGetWalkthroughsByFormationId = (formationId: number): UseQueryResult<WalkthroughPlannerDTO[], Error> => {
  return useQuery({
    queryKey: ['walkthroughPlanners', formationId],
    queryFn: () => api.fetchWalkthroughsByFormationId(formationId),
    enabled: !!formationId,
  });
};

export const useGetWalkthroughById = (id?: number): UseQueryResult<WalkthroughPlannerDTO, Error> => {
  return useQuery({
    queryKey: ['walkthroughPlanners', id],
    queryFn: () => api.fetchWalkthroughById(id!),
    enabled: !!id,
  });
};

export const useCreateWalkthrough = (): UseMutationResult<WalkthroughPlannerDTO, Error, Partial<WalkthroughPlannerDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createWalkthrough,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walkthroughPlanners'] });
    },
  });
};

interface UpdateWalkthroughVariables {
  id: number;
  data: Partial<WalkthroughPlannerDTO>;
}

export const useUpdateWalkthrough = (): UseMutationResult<WalkthroughPlannerDTO, Error, UpdateWalkthroughVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateWalkthroughVariables) => api.updateWalkthrough(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['walkthroughPlanners', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['walkthroughPlanners'] });
    },
  });
};

export const useDeleteWalkthrough = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteWalkthrough,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walkthroughPlanners'] });
    },
  });
};
