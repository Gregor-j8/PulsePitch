import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {getEvents, fetchTeamEvents, fetchTeamEventById, createTeamEvent, editTeamEvent, deleteTeamEvent} from '../managers/EventsManager'

export const useTeamEvents = () => {
  return useQuery({
    queryKey: ['event'],
    queryFn: fetchTeamEvents,
  })
}

export const useTeamEvent = (id) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchTeamEventById(id),
    enabled: !!id,
  })
}

export const useCreateTeamEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeamEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] })
    },
  })
}

export const useEditTeamEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => editTeamEvent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['event'] })
      queryClient.invalidateQueries({ queryKey: ['event', variables.id] })
    },
  })
}

export const useDeleteTeamEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeamEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] })
    },
  })
}
export const useGetEventsForDropdown = () => {
  return useQuery({
    queryKey: ['eventDropDown'],
    queryFn: getEvents,
  })
}
