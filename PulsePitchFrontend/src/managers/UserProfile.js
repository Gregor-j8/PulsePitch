import axiosClient from './axiosClient'

export const fetchAllUserProfile = async () => {
  const { data } = await axiosClient.get(`/userprofile`)
  return data
}
export const fetchUserProfileById = async (id) => {
  const { data } = await axiosClient.get(`/userprofile/${id}`)
  return data
}

export const editUserProfile = async (id, userprofileData) => {
  const { data } = await axiosClient.patch(`/userprofile/${id}`, userprofileData)
  return data
}

export const deleteUserProfile = async (id) => {
  await axiosClient.delete(`/userprofile/${id}`)
}