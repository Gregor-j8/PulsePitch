import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import {getEvents, fetchTeamEvents, fetchTeamEventById, createTeamEvent, editTeamEvent, deleteTeamEvent} from '../managers/EventsManager';
import { TeamEventDTO, EventsDTO } from '../types';

export const useTeamEvents = (id: number): UseQueryResult<TeamEventDTO[], Error> => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchTeamEvents(id),
  });
};

export const useTeamEvent = (id?: number): UseQueryResult<TeamEventDTO, Error> => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchTeamEventById(id!),
    enabled: !!id
  });
};

export const useCreateTeamEvent = (): UseMutationResult<TeamEventDTO, Error, Partial<TeamEventDTO>> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeamEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] });
    },
  });
};

interface EditTeamEventVariables {
  id: number;
  data: Partial<TeamEventDTO>;
}

export const useEditTeamEvent = (): UseMutationResult<TeamEventDTO, Error, EditTeamEventVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditTeamEventVariables) => editTeamEvent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['event'] });
      queryClient.invalidateQueries({ queryKey: ['event', variables.id] });
    },
  });
};

export const useDeleteTeamEvent = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] });
    }
  });
};

export const useGetEventsForDropdown = (): UseQueryResult<EventsDTO[], Error> => {
  return useQuery({
    queryKey: ['eventDropDown'],
    queryFn: getEvents,
  });
};
