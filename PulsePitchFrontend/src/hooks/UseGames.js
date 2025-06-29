import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeamGame, deleteTeamGame, editTeamGame, fetchTeamGameByTeamId, fetchTeamGamesById } from '../managers/GamesManager'

export const useTeamGames = (home, teamIds) => {
  return useQuery({
    queryKey: ['teamgame', teamIds],
    queryFn: () => fetchTeamGameByTeamId(home, teamIds),
    enabled: !(teamIds.length === 0),
  })
}

export const useTeamGame = (id) => {
  return useQuery({
    queryKey: ['teamgame', id],
    queryFn: () => fetchTeamGamesById(id),
    suspense: true,
    enabled: !!id
  })
}

export const useCreateTeamGame = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeamGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamgame'] })
    },
  })
}

export const useEditTeamGame = () => {
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