import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";

import { LogoutUserInDB } from "@/ports/adapters/db";
export const logoutUserInDB: LogoutUserInDB = async (data) => {
  try {
    const result = await db.users.findUnique({
      where: { id: data.user_id }
    });

    if (!result) {
      throw new NotFoundError("User not found");
    }
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
