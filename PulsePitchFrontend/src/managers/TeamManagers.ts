import axiosClient from './AxiosClient';
import { TeamDTO, JoinTeamDTO, EditTeamDTO } from '../types';

export const fetchTeams = async (): Promise<TeamDTO[]> => {
  const { data } = await axiosClient.get<TeamDTO[]>('/team');
  return data;
};

export const fetchTeamById = async (id: number): Promise<TeamDTO> => {
  const { data } = await axiosClient.get<TeamDTO>(`/team/${id}`);
  return data;
};

export const createTeam = async (teamData: Partial<TeamDTO>): Promise<TeamDTO> => {
  const { data } = await axiosClient.post<TeamDTO>('/team', teamData);
  return data;
};

export const editTeam = async (id: number, teamData: EditTeamDTO): Promise<TeamDTO> => {
  const { data } = await axiosClient.patch<TeamDTO>(`/team/${id}`, teamData);
  return data;
};

export const deleteTeam = async (id: number): Promise<void> => {
  await axiosClient.delete(`/team/${id}`);
};

export const JoinTeam = async (teamData: JoinTeamDTO): Promise<void> => {
  await axiosClient.post(`/team/jointeam`, teamData);
};
