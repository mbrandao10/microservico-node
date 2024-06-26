import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Services } from "@prisma/client";
import { FindAllServiceInDB } from "@/ports/adapters/db";

export const findAllServices: FindAllServiceInDB<Services[]> = async ({
  page,
  search
}): Promise<Services[]> => {
  try {
    const pageDefault = page ? page : "1";
    const skip = Number(pageDefault) * 20 - 20;

    const result = await db.services.findMany({
      skip,
      take: 20,
      where: {
        ...(search && {
          OR: [
            { name: { contains: search } }
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
