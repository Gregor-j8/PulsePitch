import axiosClient from './AxiosClient';
import { PlayersInFormationDTO } from '../types';

export const fetchPlayersinformationsById = async (id: number): Promise<PlayersInFormationDTO> => {
  const { data } = await axiosClient.get<PlayersInFormationDTO>(`/playersinformations/${id}`);
  return data;
};

export const fetchPlayerByFormationId = async (id: number): Promise<PlayersInFormationDTO[]> => {
  const { data } = await axiosClient.get<PlayersInFormationDTO[]>(`/playersinformations/formation/${id}`);
  return data;
};

export const createPlayersinformation = async (playersinformationData: Partial<PlayersInFormationDTO>): Promise<PlayersInFormationDTO> => {
  const { data } = await axiosClient.post<PlayersInFormationDTO>('/playersinformations', playersinformationData);
  return data;
};

export const editPlayersinformation = async (playersinformationData: PlayersInFormationDTO): Promise<PlayersInFormationDTO> => {
  const { data } = await axiosClient.patch<PlayersInFormationDTO>(`/playersinformations/${playersinformationData.id}`, playersinformationData);
  return data;
};

export const deletePlayersinformation = async (id: number): Promise<void> => {
  await axiosClient.delete(`/playersinformations/${id}`);
};
