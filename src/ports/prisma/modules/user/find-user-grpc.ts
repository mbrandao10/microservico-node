import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError } from "@/helpers/error";
import { ValidationError } from "yup";

export const findUserGrpc = async (id: string) => {
  try {
    const result = await db.users.findUnique({
      where: { id }
    });

    if (!result) {
      return null;
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

    throw new ValidationError("Error on find user by id");
  }
};

export const findAllUsersByIds = async (userIds: string[]) => {

  try {
    const result = await db.users.findMany({
      where: {
        id: {
          in: userIds
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
      }
    });

    if (!result) {
      return null;
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

    throw new ValidationError("Error on find user by id");
  }
};
