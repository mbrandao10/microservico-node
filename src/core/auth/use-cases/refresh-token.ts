import auth from "@/config/auth";
import { RefreshTokenType, refreshTokenSchema, User } from "../types";

export type OutsideFindUser = (data: RefreshTokenType) => Promise<User>;
export type OutsideRefreshToken<A> = (user: any) => Promise<A>;

type RefreshToken = <A>(
  outsideFindUser: OutsideFindUser,
  outsideRefresToken: OutsideRefreshToken<A>
) => (data: RefreshTokenType) => Promise<A>;

export const refreshToken: RefreshToken =
  (outsideFindUser, outsideRefresToken) => async (data) => {
    refreshTokenSchema.validateSync(data);
    const result = await outsideFindUser(data);
    if (result instanceof Error) {
      throw result;
    }

    const resultRefreshToken = await outsideRefresToken({
      user: result,
      refreshTokenCode: data.refresh_token,
      refreshExpiresIn: auth.refreshExpiresIn
    });

    if (resultRefreshToken instanceof Error) {
      throw resultRefreshToken;
    }

    return resultRefreshToken;
  };
