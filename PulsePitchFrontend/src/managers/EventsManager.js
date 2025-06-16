import axiosClient from './axiosClient';

export const fetchTeamEvents = async (userId) => {
  const { data } = await axiosClient.get(`/event/user/${userId}`);
  return data;
};

export const fetchTeamEventById = async (id) => {
  const { data } = await axiosClient.get(`/event/${id}`);
  return data;
};

export const createTeamEvent = async (teamEventData) => {
  const { data } = await axiosClient.post('/event', teamEventData);
  return data;
};

export const editTeamEvent = async (id, teamEventData) => {
  console.log(teamEventData)
  const { data } = await axiosClient.patch(`/event/${id}`, teamEventData);
  return data;
};

export const deleteTeamEvent = async (id) => {
  await axiosClient.delete(`/event/${id}`);
};
export const getEvents = async () => {
  const { data } = await axiosClient.get(`/events`);
  return data;
};
