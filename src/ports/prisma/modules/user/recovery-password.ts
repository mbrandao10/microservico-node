import { db } from "@/ports/prisma/prisma";
import { AuthError, NotFoundError, UnknownError } from "@/helpers/error";
import { getNow } from "@/util/date";
import { hashPassword, hashRecoveryPassword } from "@/util/hash-password";
import { ValidationError } from "yup";
import { RecoveryPasswordInDB, ResetPasswordInDB } from "@/ports/adapters/db";
import { Users } from "@prisma/client";

const LIMIT_TIME_RECOVERY_PASSWORD = 5 * 60 * 1000;

export const recoveryPassword: RecoveryPasswordInDB<Users> = async ({
  email
}): Promise<Users> => {
  try {
    const result = await db.users.findUnique({
      where: { email: email }
    });

    if (!result) {
      throw new NotFoundError("Email not found");
    }

    const datreNow = getNow();

    const hashRecoveredPassword: string = hashRecoveryPassword(
      `${email}${datreNow}`
    );

    const user = await db.users.update({
      where: { email: email },
      data: {
        hash_recovery_password: hashRecoveredPassword,
        created_at_recovery_password_hash: datreNow
      }
    });

    return user;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    if (error instanceof NotFoundError) {
      throw new NotFoundError(error.message);
    }

    throw new ValidationError("Failed to authenticate user");
  }
};
export const resetPassword: ResetPasswordInDB = async ({
  hash_recovery_password,
  password
}) => {
  try {
    const result = await db.users.findUnique({
      where: { hash_recovery_password: hash_recovery_password }
    });

    if (!result) {
      throw new AuthError("Link invalid");
    }

    if (
      result.created_at_recovery_password_hash &&
      result.created_at_recovery_password_hash.getTime() +
        LIMIT_TIME_RECOVERY_PASSWORD <
        getNow().getTime()
    ) {
      throw new AuthError("Link expired");
    }

    const hashNewPassword = hashPassword(password);

    await db.users.update({
      where: { id: result.id },
      data: {
        password: hashNewPassword,
        hash_recovery_password: null,
        created_at_recovery_password_hash: null
      }
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    if (error instanceof AuthError) {
      throw new AuthError(error.message);
    }

    throw new ValidationError("Not possible to reset password");
  }
};
