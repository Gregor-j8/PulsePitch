import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlayersinformation, deletePlayersinformation, editPlayersinformation, fetchPlayerByFormationId, fetchPlayersinformationsById } from '../managers/PlayersInFormationManager'

export const usePlayersInFormations = (id) => {
  return useQuery({
    queryKey: ['PlayersInFormations', id],
    queryFn: () => fetchPlayersinformationsById(id),
    suspense: true,
    enabled: !!id
  })
}

export const usePlayersByFormationId = (id) => {
  return useQuery({
    queryKey: ['PlayersInFormations', id],
    queryFn: () => fetchPlayerByFormationId(id),
    suspense: true,
    enabled: !!id
  })
}

export const useCreatePlayersInFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPlayersinformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] })
    },
  })
}

export const useEditPlayersInFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => editPlayersinformation(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] })
      queryClient.invalidateQueries({ queryKey: ['PlayersInFormations', variables.id] })
    },
  })
}

export const useDeletePlayersInFormations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePlayersinformation,
   onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['PlayersInFormations'] });
    }
  })
}