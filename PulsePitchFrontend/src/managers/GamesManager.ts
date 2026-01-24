import axiosClient from './AxiosClient';
import { TeamGameDTO } from '../types';
import qs from 'qs';

export const fetchTeamGameByTeamId = async (home: boolean, teamIds: number[]): Promise<TeamGameDTO[]> => {
  const { data } = await axiosClient.get<TeamGameDTO[]>('/teamgame/team', {
    params: { home: home, id: teamIds },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return data;
};

export const fetchTeamGamesById = async (id: number): Promise<TeamGameDTO> => {
  const { data } = await axiosClient.get<TeamGameDTO>(`/teamgame/${id}`);
  return data;
};

export const createTeamGame = async (teamGameData: Partial<TeamGameDTO>): Promise<TeamGameDTO> => {
  const { data } = await axiosClient.post<TeamGameDTO>('/teamgame', teamGameData);
  return data;
};

export const editTeamGame = async (id: number, teamGameData: Partial<TeamGameDTO>): Promise<TeamGameDTO> => {
  const { data } = await axiosClient.patch<TeamGameDTO>(`/teamgame/${id}`, teamGameData);
  return data;
};

export const deleteTeamGame = async (id: number): Promise<void> => {
  await axiosClient.delete(`/teamgame/${id}`);
};
