import axiosClient from './axiosClient';

export const fetchPlayersinformationsById = async (id) => {
  const { data } = await axiosClient.get(`/playersinformations/${id}`);
  return data;
};
export const fetchPlayerByFormationId = async (id) => {
  const { data } = await axiosClient.get(`/playersinformations/formation/${id}`);
  return data;
};

export const createPlayersinformation = async (playersinformationData) => {
  const { data } = await axiosClient.post('/playersinformations', playersinformationData);
  return data;
};

export const editPlayersinformation = async (id, playersinformationData) => {
  const { data } = await axiosClient.patch(`/playersinformations/${id}`, playersinformationData);
  return data;
};

export const deletePlayersinformation = async (id) => {
  await axiosClient.delete(`/playersinformations/${id}`);
};