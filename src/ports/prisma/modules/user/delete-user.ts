import { db } from "@/ports/prisma/prisma";
import { UnknownError, ValidationError } from "@/helpers/error";
import { DeleteUserInDB } from "@/ports/adapters/db";

export const deleteUserInDB:DeleteUserInDB = async ({ user_id }) => {
  try {
    await db.users.update({
      where: {
        id: user_id
      },
      data: {
        deleted: true
      }
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    throw new ValidationError("Error at delete user");
  }
};
