import { apiRoutes } from '@/config';
import { resetPasswordProps, sendVerificationEmailProps, signInProps, signUpProps } from '@/features/auth/lib/schemas';
import { api } from '@/lib/api/authFetch';
import { ApiResponse } from '@repo/types/api';

export const signUpService = async (values: signUpProps) => {
  const response = await api.post(
    apiRoutes.auth.signUp,
    {
      body: values,
    },
    true
  );

  return response;
};

export const signInService = async (values: signInProps): Promise<ApiResponse> => {
  const response = await api.post(
    apiRoutes.auth.signIn,
    {
      body: values,
    },
    true
  );

  return response;
};

export const forgotPasswordService = async (email: string): Promise<ApiResponse> => {
  const response = await api.post(
    apiRoutes.auth.forgotPassword,
    {
      body: { email },
    },
    true
  );
  return response;
};

export const verifyEmailService = async (token: string): Promise<ApiResponse> => {
  const response = await api.post(
    apiRoutes.auth.verifyEmail,
    {
      body: { token },
    },
    true
  );

  return response;
};

export const resetPasswordService = async (values: resetPasswordProps): Promise<ApiResponse> => {
  const response = await api.post(
    apiRoutes.auth.resetPassword,
    {
      body: values,
    },
    true
  );

  return response;
};

export const sendVerificationEmailService = async ({ token }: sendVerificationEmailProps): Promise<ApiResponse> => {
  const response = await api.post(apiRoutes.auth.signIn, {
    body: { token },
  });

  return response;
};

export const signOutService = async (): Promise<ApiResponse> => {
  const response = await api.post<string>(apiRoutes.auth.signOut);
  return response;
};