import axiosClient from './axiosClient';

export const fetchTeamGameByTeamId = async (home, userId) => {
  const { data } = await axiosClient.get(`/teamgame/team/home=${home}&${userId}`);
  return data;
};

export const fetchTeamGametById = async (id) => {
  const { data } = await axiosClient.get(`/teamgame/${id}`);
  return data;
};

export const createTeamGame = async (teamGameData) => {
  const { data } = await axiosClient.post('/teamgame', teamGameData);
  return data;
};

export const editTeamGame = async (id, teamGameData) => {
  const { data } = await axiosClient.patch(`/teamgame/${id}`, teamGameData);
  return data;
};

export const deleteTeamGame = async (id) => {
  await axiosClient.delete(`/teamgame/${id}`);
};