import { resetPasswordSchema, ResetPasswordType } from "../types";

export type OutsideResetPassword<A> = (data: ResetPasswordType) => Promise<A>;

type ResetPassword = <A>(
  outsideResetPassword: OutsideResetPassword<A>
) => (data: ResetPasswordType) => Promise<A>;

export const resetPassword: ResetPassword =
  (outsideResetPassword) => async (data) => {
    resetPasswordSchema.validateSync(data);
    const result = await outsideResetPassword(data);

    return result;
  };
