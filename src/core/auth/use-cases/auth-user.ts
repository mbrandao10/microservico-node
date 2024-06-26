import { LoginType, loginSchema } from "../types";

export type OutsideAuthUser<A> = (data: LoginType) => Promise<A>;

type AuthUser = <A>(
  outsideAuthUser: OutsideAuthUser<A>
) => (data: LoginType) => Promise<A>;

export const outhUser: AuthUser = (outsideAuthUser) => async (data) => {
  loginSchema.validateSync(data);
  const result = await outsideAuthUser(data);

  return result;
};


