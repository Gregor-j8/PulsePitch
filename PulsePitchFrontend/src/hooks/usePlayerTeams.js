import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {fetchPlayerTeams, fetchPlayerTeamById, createPlayerTeam, editPlayerTeam, deletePlayerTeam, getCurrentPlayerTeams} from '../managers/PlayerTeamManagers'

export const usePlayerTeams = () => {
  return useQuery({
    queryKey: ['playerTeams'],
    queryFn: fetchPlayerTeams,
  })
}

export const useGetPlayersFromTeam = (id) => {
  return useQuery({
    queryKey: ['playerTeam', id],
    queryFn: () => fetchPlayerTeamById(id),
    enabled: !!id,
  })
}
export const useCurrentPlayerTeam = (id) => {
  return useQuery({
    queryKey: ['playerTeam', id],
    queryFn: () => getCurrentPlayerTeams(id),
    enabled: !!id,
  })
}

export const useCreatePlayerTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPlayerTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerTeams'] })
    },
  })
}

export const useEditPlayerTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editPlayerTeam(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['playerTeams'] })
      queryClient.invalidateQueries({ queryKey: ['playerTeam', variables.id] })
    },
  })
}

export const useDeletePlayerTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePlayerTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerTeam'] })
    },
  })
}