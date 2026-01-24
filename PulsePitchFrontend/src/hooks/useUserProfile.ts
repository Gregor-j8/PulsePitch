import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { deleteUserProfile, editUserProfile, fetchUserProfileById, fetchAllUserProfile } from "../managers/UserProfile";
import { UserProfileDTO } from "../types";

export const useAllUserProfile = (): UseQueryResult<UserProfileDTO[], Error> => {
  return useQuery({
    queryKey: ['userprofiles'],
    queryFn: () => fetchAllUserProfile(),
  });
};

export const useUserProfile = (id?: number): UseQueryResult<UserProfileDTO, Error> => {
  return useQuery({
    queryKey: ['userprofiles', id],
    queryFn: () => fetchUserProfileById(id!),
    enabled: !!id,
  });
};

interface EditUserProfileVariables {
  id: number;
  data: Partial<UserProfileDTO>;
}

export const useEditUserProfile = (): UseMutationResult<UserProfileDTO, Error, EditUserProfileVariables> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditUserProfileVariables) => editUserProfile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userprofiles'] });
      queryClient.invalidateQueries({ queryKey: ['userprofile', variables.id] });
    },
  });
};

export const useDeleteUserProfile = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userprofiles'] });
    },
  });
};
