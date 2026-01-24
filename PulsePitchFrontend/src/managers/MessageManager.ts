import axiosClient from './AxiosClient';
import { MessageDTO, EditMessageDTO } from '../types';

export const fetchUserMessages = async (userid: number): Promise<MessageDTO[]> => {
  const { data } = await axiosClient.get<MessageDTO[]>(`/message/${userid}`);
  return data;
};

export const fetchMessagesByRoomId = async (roomid: number): Promise<MessageDTO[]> => {
  const { data } = await axiosClient.get<MessageDTO[]>(`/message/room/${roomid}`);
  return data;
};

export const createMessages = async (messageData: Partial<MessageDTO>): Promise<MessageDTO> => {
  const { data } = await axiosClient.post<MessageDTO>('/message', messageData);
  return data;
};

export const editMessage = async (id: number, messageData: EditMessageDTO): Promise<MessageDTO> => {
  const { data } = await axiosClient.put<MessageDTO>(`/message/${id}`, messageData);
  return data;
};

export const deleteMessageRoom = async (roomid: number): Promise<void> => {
  await axiosClient.delete(`/message/${roomid}`);
};

export const deleteMessageById = async (id: number): Promise<void> => {
  await axiosClient.delete(`/message/${id}`);
};
