import { postRequest } from "@/lib/httpInstance";
import {
  AuthenticationResponse,
  AuthenticationRequest,
  ResetPasswordEmailRequest,
  ResetPasswordRequest,
} from "@/models";
import { setCookies } from "cookies-next";

export const handleAuthenticate = async (
  authenticationModel: AuthenticationRequest
) => {
  const { token, userType } = await postRequest<
    AuthenticationRequest,
    AuthenticationResponse
  >("authentication", authenticationModel);

  if (!token) throw new Error("Missing Token!");

  setCookies("next-authentication-token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 4 * 60 * 60,
    path: "/",
  });

  return { token, userType };
};

export const handleSendRecoverLink = async (
  requestData: ResetPasswordEmailRequest
) => {
  await postRequest(`authentication/recover`, requestData);
};

export const handleUpdatePassword = async (
  token: string,
  requestData: ResetPasswordRequest
) => {
  await postRequest(`authentication/password/set`, { ...requestData, token });
};

export const authenticationService = {
  authenticate: handleAuthenticate,
  handleSendRecoverLink,
  handleUpdatePassword,
};
