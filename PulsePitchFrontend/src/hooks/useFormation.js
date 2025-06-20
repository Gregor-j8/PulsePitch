import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createFormations, deleteFormations, editFormations, fetchFormationsById, fetchFormationsByTeamId } from '../managers/FormationManager'

export const useGetFormationsByTeamId = (teamIds) => {
  return useQuery({
    queryKey: ['formations', teamIds],
    queryFn: () => fetchFormationsByTeamId(teamIds),
    enabled: !(teamIds[0] === undefined || teamIds.length === 0),
    suspense: true,
  })
}

export const useGetFormationsById = (id) => {
  return useQuery({
    queryKey: ['formations', id],
    queryFn: () => fetchFormationsById(id),
    suspense: true,
    enabled: !!id
  })
}

export const useCreateFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFormations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] })
    },
  })
}

export const useEditFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editFormations(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['formations'] })
      queryClient.invalidateQueries({ queryKey: ['formations', variables.id] })
    },
  })
}

export const useDeleteFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFormations,
    onSuccess: () => {
      queryClient.invalidateQueries(['formations']);
    }
  })
}