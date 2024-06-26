import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required")
});

export type LoginType = yup.InferType<typeof loginSchema>;

export const loginTwoFactorsSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  code: yup.string().min(4).max(4).required("Code is required")
});

export type LoginTwoFactorsType = yup.InferType<typeof loginTwoFactorsSchema>;

export const refreshTokenSchema = yup.object({
  user_id: yup.string().required("User id is required"),
  refresh_token: yup.string().required("Refresh token is required")
});

export type RefreshTokenType = yup.InferType<typeof refreshTokenSchema>;

export type User = {
  id: string;
  email: string;
  refresh_token: string | null;
  token_expires_in: Date | null;
  profiles: string[];
};


export type AcessPermission = {
  user_id: string;
}