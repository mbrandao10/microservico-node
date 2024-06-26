import { AcessPermission, LoginType } from "@/core/auth/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as auth from "@/core/auth/use-cases";
import * as user from "@/core/user/use-cases";
import { ResetPasswordType } from "@/core/user/types";
import { sendResetPasswordMail } from "../../mail";

export const authUser = async (input: LoginType) => {
  const result = await auth.outhUser(dbAdpter.authUserInDB)(input);
  return result;
};

export const logoutUser = async (input: dbAdpter.LogoutUserType) => {
  const result = await dbAdpter.logoutUserInDB(input);
  return result;
};

export const recoveryPassword = async ({
  email
}: dbAdpter.RecoveryPasswordType) => {
  const result = await dbAdpter.recoveryPasswordInDB({ email });
  sendResetPasswordMail({
    to: result.email,
    link: `${process.env["URL_FRONTEND"]}/recovery?recovery-password-hash=${result.hash_recovery_password}`
  }).catch(console.log);

  return result;
};

export const resetPassword = async (input: ResetPasswordType) => {
  const result = await user.resetPassword(dbAdpter.resetPasswordInDB)(input);
  return result;
};

type AcessPermissionType = {
  user_master: boolean
  companie_ids: string[]
}
export const acessPermission = async (input: AcessPermission) => {
  const user = await auth.outAccessPermission(dbAdpter.findUserById)(input);
  const result: AcessPermissionType = {
    user_master: false,
    companie_ids: []
  }

  if (user.group_companies_ids.length != 0) {
    const companysGroup = await dbAdpter.findGroupCompanyByIds({ group_company_id: user.group_companies_ids }); 
    const company_ids = companysGroup.map((companyGroup) => companyGroup.company_ids);
    result.companie_ids = company_ids.map((company) => company.toString());

    return result
  }

  result.user_master = true

  return result;
};
