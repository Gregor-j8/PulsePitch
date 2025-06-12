import axiosClient from './axiosClient'

export const fetchTeams = async () => {
  const { data } = await axiosClient.get('/team')
  return data
}

export const fetchTeamById = async (id) => {
  const { data } = await axiosClient.get(`/team/${id}`)
  return data
}

export const createTeam = async (teamData) => {
  const { data } = await axiosClient.post('/team', teamData)
  return data
}

export const editTeam = async (id, teamData) => {
  const { data } = await axiosClient.patch(`/team/${id}`, teamData)
  return data
}

export const deleteTeam = async (id) => {
  await axiosClient.delete(`/team/${id}`)
}

export const JoinTeam = async (teamData) => {
  await axiosClient.post(`/team/jointeam`, teamData)
}