import axiosClient from './axiosClient';
import qs from 'qs';


export const fetchFormationsByTeamId = async (id) => {
  const { data } = await axiosClient.get(`/formations/team`, {
    params: { id: id },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  })
  return data
};

export const fetchFormationsById = async (id) => {
  const { data } = await axiosClient.get(`/formations/${id}`);
  return data;
};

export const createFormations = async (formationsData) => {
  const { data } = await axiosClient.post('/formations', formationsData);
  return data;
};

export const editFormations = async (id, formationsData) => {
  const { data } = await axiosClient.patch(`/formations/${id}`, formationsData);
  return data;
};

export const deleteFormations = async (id) => {
  await axiosClient.delete(`/formations/${id}`);
};