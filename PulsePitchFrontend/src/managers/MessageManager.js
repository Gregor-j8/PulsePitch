import axiosClient from './axiosClient';

export const fetchUserMessages = async (userid) => {
  const { data } = await axiosClient.get(`/message/${userid}`);
  return data;
};

export const fetchMessagesByRoomId = async (roomid) => {
  const { data } = await axiosClient.get(`/message/room/${roomid}`);
  return data;
};

export const createMessages = async (messageData) => {
  const { data } = await axiosClient.post('/message', messageData);
  return data;
};

export const editMessage = async (id, messageData) => {
  const { data } = await axiosClient.put(`/message/${id}`, messageData);
  return data;
};

export const deleteMessageRoom = async (roomid) => {
  await axiosClient.delete(`/message/${roomid}`);
};
export const deleteMessageById = async (id) => {
  await axiosClient.delete(`/message/${id}`);
};