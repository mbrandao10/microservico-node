import { db } from "@/ports/prisma/prisma";
import {
  AuthError,
  ForbiddenError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { validPassword } from "@/util/hash-password";
import { Users } from "@prisma/client";

import { AuthUserInDB } from "@/ports/adapters/db";

export const authUser: AuthUserInDB<Users> = async (data): Promise<Users> => {
  try {
    const result = await db.users.findUnique({
      where: { email: data.email }
    });

    if (result?.active === false) {
      throw new ForbiddenError("User not active");
    }

    if (!result) {
      throw new AuthError("User or password incorrect");
    }

    if (result.password !== validPassword(data.password)) {
      throw new AuthError("User or password incorrect");
    }

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    if (error instanceof AuthError) {
      throw new AuthError(error.message);
    }

    if (error instanceof ForbiddenError) {
      throw new ForbiddenError(error.message);
    }

    throw new ValidationError("Failed to authenticate user");
  }
};
