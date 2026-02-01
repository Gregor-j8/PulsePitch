import axiosClient from './AxiosClient';
import { TeamDTO, JoinTeamDTO, EditTeamDTO, PublicTeamSearchDTO, JoinRequestDTO, JoinRequestResponseDTO, PendingJoinRequestDTO } from '../types';

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

export const fetchPublicTeams = async (): Promise<PublicTeamSearchDTO[]> => {
  const { data } = await axiosClient.get<PublicTeamSearchDTO[]>('/team/public');
  return data;
};

export const searchPublicTeams = async (searchTerm: string): Promise<PublicTeamSearchDTO[]> => {
  const { data } = await axiosClient.get<PublicTeamSearchDTO[]>(
    `/team/public/search?q=${encodeURIComponent(searchTerm)}`
  );
  return data;
};

export const requestJoinTeam = async (request: JoinRequestDTO): Promise<{ status: string; message: string }> => {
  const { data } = await axiosClient.post(`/team/request-join`, request);
  return data;
};

export const fetchPendingJoinRequests = async (teamId: number): Promise<PendingJoinRequestDTO[]> => {
  const { data } = await axiosClient.get<PendingJoinRequestDTO[]>(`/team/${teamId}/pending-requests`);
  return data;
};

export const respondToJoinRequest = async (
  playerTeamId: number,
  response: JoinRequestResponseDTO
): Promise<{ status: string; message: string }> => {
  const { data } = await axiosClient.put(`/team/join-request/${playerTeamId}/respond`, response);
  return data;
};
