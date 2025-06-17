import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeamGame, deleteTeamGame, editTeamGame, fetchTeamGameByTeamId, fetchTeamGametById } from '../managers/GamesManager'

export const useTeamEvents = (id) => {
  return useQuery({
    queryKey: ['teamgame', id],
    queryFn: () => fetchTeamGameByTeamId(id),
  })
}

export const useTeamEvent = (id) => {
  return useQuery({
    queryKey: ['teamgame', id],
    queryFn: () => fetchTeamGametById(id),
    suspense: true,
    enabled: !!id
  })
}

export const useCreateTeamEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeamGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] })
    },
  })
}

export const useEditTeamEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editTeamGame(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] })
      queryClient.invalidateQueries({ queryKey: ['teamgame', variables.id] })
    },
  })
}

export const useDeleteTeamGame = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeamGame,
   onSuccess: () => {
  queryClient.invalidateQueries(['teamgame']);
    }
  })
}

