import { postRequest, putRequest } from "@/lib";
import {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserResponse,
} from "@/models";
import useSWR from "swr";

export const useUsers = () => {
  const { data: users, mutate } = useSWR<UserResponse[]>("users");
  return { users, mutate };
};

export const useUserDetails = (userId: string) => {
  const { data: userDetails, mutate } = useSWR<UserResponse>(`users/${userId}`);
  return { userDetails, mutate };
};

export const handleCreateUser = async (requestData: CreateUserRequest) => {
  await postRequest(`users/create`, requestData);
};

export const handleUpdateUser = async (
  userId: string,
  requestData: UpdateUserRequest
) => {
  await putRequest(`users/${userId}/update`, requestData);
};

export const useProfile = () => {
  const { data: profile, mutate } = useSWR<UserResponse>("users/profile");
  return { profile, mutate };
};

export const handleUpdateProfile = async (
  requestData: UpdateProfileRequest
) => {
  await putRequest(`users/profile/update`, requestData);
};

export const adminUsersService = {
  handleGetUsers: useUsers,
  handleCreateUser,
  handleGetUserDetails: useUserDetails,
  handleUpdateUser,
  handleGetProfile: useProfile,
  handleUpdateProfile,
};
