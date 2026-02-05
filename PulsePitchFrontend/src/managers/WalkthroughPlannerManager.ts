import axiosClient from './AxiosClient';
import { WalkthroughPlannerDTO } from '../types';

export const fetchWalkthroughsByFormationId = async (
  formationId: number
): Promise<WalkthroughPlannerDTO[]> => {
  const { data } = await axiosClient.get<WalkthroughPlannerDTO[]>(
    `/walkthroughplanners/formation/${formationId}`
  );
  return data;
};

export const fetchWalkthroughById = async (
  id: number
): Promise<WalkthroughPlannerDTO> => {
  const { data } = await axiosClient.get<WalkthroughPlannerDTO>(`/walkthroughplanners/${id}`);
  return data;
};

export const createWalkthrough = async (
  walkthrough: Partial<WalkthroughPlannerDTO>
): Promise<WalkthroughPlannerDTO> => {
  const { data } = await axiosClient.post<WalkthroughPlannerDTO>('/walkthroughplanners', walkthrough);
  return data;
};

export const updateWalkthrough = async (
  id: number,
  walkthrough: Partial<WalkthroughPlannerDTO>
): Promise<WalkthroughPlannerDTO> => {
  const { data } = await axiosClient.put<WalkthroughPlannerDTO>(`/walkthroughplanners/${id}`, walkthrough);
  return data;
};

export const deleteWalkthrough = async (id: number): Promise<void> => {
  await axiosClient.delete(`/walkthroughplanners/${id}`);
};
