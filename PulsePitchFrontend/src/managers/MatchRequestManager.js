import axiosClient from './axiosClient';

export const fetchUserMatchRequest = async (userid) => {
  const { data } = await axiosClient.get(`/matchrequest/${userid}`);
  return data;
};

export const fetchMatchRequestByRoomId = async (id) => {
  const { data } = await axiosClient.get(`/matchrequest/${id}`);
  return data;
};

export const createMatchRequest = async (messageData) => {
  const { data } = await axiosClient.post('/matchrequest', messageData);
  return data;
};

export const editMatchRequest = async (id, messageData) => {
  const { data } = await axiosClient.put(`/matchrequest/${id}`, messageData);
  return data;
};

export const createMatchResponse = async (matchid, messageData) => {
  const { data } = await axiosClient.put(`/matchrequest/${matchid}`, messageData);
  return data;
};

export const deleteMatchRequest = async (id) => {
  await axiosClient.delete(`/matchrequest/${id}`);
};
