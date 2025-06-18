import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTeams, fetchTeamById, createTeam, editTeam, deleteTeam, JoinTeam } from '../managers/TeamManagers'
import { Suspense } from 'react'

export const useTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  })
}

export const useTeam = (id) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => fetchTeamById(id),
    enabled: !!id,
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}

export const useEditTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editTeam(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
      queryClient.invalidateQueries({ queryKey: ['team', variables.id] })
    },
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}

export const useJoinTeam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: JoinTeam,
    Suspense: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}