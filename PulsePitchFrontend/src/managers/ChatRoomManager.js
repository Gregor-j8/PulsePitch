import axiosClient from './axiosClient';

export const fetchChatRooms = async (userId) => {
  const { data } = await axiosClient.get(`/chatroom/${userId}`);
  return data;
};

export const createChatRoom = async (chatRoomData) => {
  const { data } = await axiosClient.post('/chatroom', chatRoomData);
  return data;
};

export const deleteChatRoom = async (id) => {
  await axiosClient.delete(`/chatroom/${id}`);
};
