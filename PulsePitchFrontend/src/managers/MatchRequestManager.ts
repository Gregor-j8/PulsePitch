import axiosClient from './AxiosClient';
import { MatchRequestDTO, CreateMatchRequestDTO, MatchResponseDTO } from '../types';

export const fetchUserMatchRequest = async (userid: number): Promise<MatchRequestDTO[]> => {
  const { data } = await axiosClient.get<MatchRequestDTO[]>(`/matchrequest/user/${userid}`);
  return data;
};

export const fetchMatchRequestByRoomId = async (id: number): Promise<MatchRequestDTO> => {
  const { data } = await axiosClient.get<MatchRequestDTO>(`/matchrequest/${id}`);
  return data;
};

export const createMatchRequest = async (messageData: CreateMatchRequestDTO): Promise<MatchRequestDTO> => {
  const { data } = await axiosClient.post<MatchRequestDTO>('/matchrequest', messageData);
  return data;
};

export const editMatchRequest = async (id: number, messageData: Partial<MatchRequestDTO>): Promise<MatchRequestDTO> => {
  const { data } = await axiosClient.put<MatchRequestDTO>(`/matchrequest/${id}`, messageData);
  return data;
};

export const createMatchResponse = async (matchid: number, messageData: MatchResponseDTO): Promise<MatchRequestDTO> => {
  const { data } = await axiosClient.put<MatchRequestDTO>(`/matchrequest/match/${matchid}`, messageData);
  return data;
};

export const deleteMatchRequest = async (id: number): Promise<void> => {
  await axiosClient.delete(`/matchrequest/${id}`);
};
