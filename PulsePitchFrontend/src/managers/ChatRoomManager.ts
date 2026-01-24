import axiosClient from './AxiosClient';
import { ChatRoomDTO } from '../types';

export const fetchChatRooms = async (userId: number): Promise<ChatRoomDTO[]> => {
  const { data } = await axiosClient.get<ChatRoomDTO[]>(`/chatroom/${userId}`);
  return data;
};

export const createChatRoom = async (chatRoomData: Partial<ChatRoomDTO>): Promise<ChatRoomDTO> => {
  const { data } = await axiosClient.post<ChatRoomDTO>('/chatroom', chatRoomData);
  return data;
};

export const deleteChatRoom = async (id: number): Promise<void> => {
  await axiosClient.delete(`/chatroom/${id}`);
};
