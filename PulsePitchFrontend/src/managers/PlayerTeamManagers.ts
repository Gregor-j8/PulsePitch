import axiosClient from './AxiosClient';
import { PlayerTeamDTO, GetTeamsByPlayerIdDTO } from '../types';
import { AxiosResponse } from 'axios';

export const fetchPlayerTeams = async (): Promise<PlayerTeamDTO[]> => {
  const { data } = await axiosClient.get<PlayerTeamDTO[]>('/playerteam');
  return data;
};

export const fetchPlayerTeamById = async (id: number): Promise<PlayerTeamDTO> => {
  const { data } = await axiosClient.get<PlayerTeamDTO>(`/playerteam/${id}`);
  return data;
};

export const createPlayerTeam = async (playerTeamData: Partial<PlayerTeamDTO>): Promise<PlayerTeamDTO> => {
  const { data } = await axiosClient.post<PlayerTeamDTO>('/playerteam', playerTeamData);
  return data;
};

export const editPlayerTeam = async (id: number, playerTeamData: Partial<PlayerTeamDTO>): Promise<PlayerTeamDTO> => {
  const { data } = await axiosClient.patch<PlayerTeamDTO>(`/playerteam/${id}`, playerTeamData);
  return data;
};

export const deletePlayerTeam = async (id: number): Promise<void> => {
  await axiosClient.delete(`/playerteam/${id}`);
};

export const getCurrentPlayerTeams = async (id: number): Promise<AxiosResponse<GetTeamsByPlayerIdDTO[]>> => {
  const team = await axiosClient.get<GetTeamsByPlayerIdDTO[]>(`/PlayerTeam/player/${id}`);
  return team;
};
