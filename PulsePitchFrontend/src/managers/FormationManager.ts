import axiosClient from './AxiosClient';
import { FormationsDTO, EditFormationsDTO } from '../types';
import qs from 'qs';

export const fetchFormationsByTeamId = async (id: number): Promise<FormationsDTO[]> => {
  const { data } = await axiosClient.get<FormationsDTO[]>(`/formations/team`, {
    params: { id: id },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return data;
};

export const fetchFormationsById = async (id: number): Promise<FormationsDTO> => {
  const { data } = await axiosClient.get<FormationsDTO>(`/formations/${id}`);
  return data;
};

export const createFormations = async (formationsData: Partial<FormationsDTO>): Promise<FormationsDTO> => {
  const { data } = await axiosClient.post<FormationsDTO>('/formations', formationsData);
  return data;
};

export const editFormations = async (id: number, formationsData: EditFormationsDTO): Promise<FormationsDTO> => {
  const { data } = await axiosClient.patch<FormationsDTO>(`/formations/${id}`, formationsData);
  return data;
};

export const deleteFormations = async (id: number): Promise<void> => {
  await axiosClient.delete(`/formations/${id}`);
};
