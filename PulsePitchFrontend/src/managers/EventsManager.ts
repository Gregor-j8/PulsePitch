import axiosClient from './AxiosClient';
import { TeamEventDTO, EventsDTO } from '../types';

export const fetchTeamEvents = async (userId: number): Promise<TeamEventDTO[]> => {
  const { data } = await axiosClient.get<TeamEventDTO[]>(`/event/user/${userId}`);
  return data;
};

export const fetchTeamEventById = async (id: number): Promise<TeamEventDTO> => {
  const { data } = await axiosClient.get<TeamEventDTO>(`/event/${id}`);
  return data;
};

export const createTeamEvent = async (teamEventData: Partial<TeamEventDTO>): Promise<TeamEventDTO> => {
  const { data} = await axiosClient.post<TeamEventDTO>('/event', teamEventData);
  return data;
};

export const editTeamEvent = async (id: number, teamEventData: Partial<TeamEventDTO>): Promise<TeamEventDTO> => {
  const { data } = await axiosClient.patch<TeamEventDTO>(`/event/${id}`, teamEventData);
  return data;
};

export const deleteTeamEvent = async (id: number): Promise<void> => {
  await axiosClient.delete(`/event/${id}`);
};

export const getEvents = async (): Promise<EventsDTO[]> => {
  const { data } = await axiosClient.get<EventsDTO[]>(`/events`);
  return data;
};
