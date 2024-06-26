import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Users } from "@prisma/client";
import { FindAllUserInDB } from "@/ports/adapters/db";

export const findAllUsers: FindAllUserInDB<Users[]> = async ({
  page,
  search
}): Promise<Users[]> => {
  try {
    const pageDefault = page ? page : "1";
    const skip = Number(pageDefault) * 20 - 20;

    const result = await db.users.findMany({
      skip,
      take: 20,
      where: {
        ...(search && {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { document_number: { contains: search } }
          ]
        })
      }
    });
      
    if (!result.length) {
      return [];
    }

    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(error.message);
    }
    if (error instanceof NotFoundError) {
      throw new NotFoundError(error.message);
    }

    throw new UnknownError();
  }
};
