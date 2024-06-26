import { db } from "@/ports/prisma/prisma";
import {
  ForbiddenError,
  NotFoundError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { Users } from "@prisma/client";
import { FindByIdUserInDB } from "@/ports/adapters/db/types";

export const findUserById: FindByIdUserInDB<Users> = async (
  data
): Promise<Users> => {
  try {
    const result = await db.users.findUnique({
      where: { id: data.user_id }
    });

    if (!result) {
      throw new NotFoundError("User not found");
    }

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    if (error instanceof ValidationError) {
      throw new ValidationError(error.message);
    }
    if (error instanceof NotFoundError) {
      throw new NotFoundError(error.message);
    }

    if (error instanceof ForbiddenError) {
      throw new ForbiddenError(error.message);
    }

    throw new ValidationError("Error on find user by id");
  }
};
