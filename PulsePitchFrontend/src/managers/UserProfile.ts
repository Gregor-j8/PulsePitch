import axiosClient from './AxiosClient';
import { UserProfileDTO } from '../types';

export const fetchAllUserProfile = async (): Promise<UserProfileDTO[]> => {
  const { data } = await axiosClient.get<UserProfileDTO[]>(`/userprofile`);
  return data;
};

export const fetchUserProfileById = async (id: number): Promise<UserProfileDTO> => {
  const { data } = await axiosClient.get<UserProfileDTO>(`/userprofile/${id}`);
  return data;
};

export const editUserProfile = async (id: number, userprofileData: Partial<UserProfileDTO>): Promise<UserProfileDTO> => {
  const { data } = await axiosClient.patch<UserProfileDTO>(`/userprofile/${id}`, userprofileData);
  return data;
};

export const deleteUserProfile = async (id: number): Promise<void> => {
  await axiosClient.delete(`/userprofile/${id}`);
};
