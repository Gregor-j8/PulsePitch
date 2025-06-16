import axiosClient from './axiosClient';

export const fetchPlayerTeams = async () => {
  const { data } = await axiosClient.get('/playerteam');
  return data;
};

export const fetchPlayerTeamById = async (id) => {
  const { data } = await axiosClient.get(`/playerteam/${id}`);
  return data;
};

export const createPlayerTeam = async (playerTeamData) => {
  const { data } = await axiosClient.post('/playerteam', playerTeamData);
  return data;
};

export const editPlayerTeam = async (id, playerTeamData) => {
  const { data } = await axiosClient.patch(`/playerteam/${id}`, playerTeamData);
  return data;
};

export const deletePlayerTeam = async (id) => {
  await axiosClient.delete(`/playerteam/${id}`);
};

export const getCurrentPlayerTeams = async(id) => {
  const team = await axiosClient.get(`/PlayerTeam/player/${id}`);
  return team
}
