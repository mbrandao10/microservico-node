import { LoginType } from "@/core/auth/types";
import { database as db } from "../db";
import { LogoutUserType, RecoveryPasswordType } from "../types";
import { ResetPasswordType } from "@/core/user/types";

export const authUserInDB = async (input: LoginType) => {
  const result = await db.authUser(input);
  return result;
};

export const recoveryPasswordInDB = async ({ email }: RecoveryPasswordType) => {
  const result = await db.recoveryPassword({ email });
  return result;
};

export const resetPasswordInDB = async (input: ResetPasswordType) => {
  const result = await db.resetPassword(input);
  return result;
};

export const logoutUserInDB = async (input: LogoutUserType) => {
  const result = await db.logoutUserInDB(input);
  return result;
};
