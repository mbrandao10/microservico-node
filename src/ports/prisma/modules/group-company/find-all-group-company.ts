import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { GroupCompanies } from "@prisma/client";
import { FindAllGroupCompanyInDB } from "@/ports/adapters/db";

export const findAllGroupCompanies: FindAllGroupCompanyInDB<GroupCompanies[]> = async ({
  page,
  search
}): Promise<GroupCompanies[]> => {
  try {
    const pageDefault = page ? page : "1";
    const skip = Number(pageDefault) * 20 - 20;

    const result = await db.groupCompanies.findMany({
      skip,
      take: 20,
      where: {
        ...(search && {
          OR: [
            { name: { contains: search } },
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
