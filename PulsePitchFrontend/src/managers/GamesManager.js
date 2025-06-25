import axiosClient from './axiosClient';
import qs from 'qs';


export const fetchTeamGameByTeamId = async (home, teamIds) => {
  const { data } = await axiosClient.get('/teamgame/team', {
    params: { home: home, id: teamIds },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return data;
};

export const fetchTeamGamesById = async (id) => {
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