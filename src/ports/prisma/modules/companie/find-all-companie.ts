import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Companies } from "@prisma/client";
import { FindAllCompanieInDB } from "@/ports/adapters/db";

export const findAllCompanies: FindAllCompanieInDB<Companies[]> = async ({
  page,
  search
}): Promise<Companies[]> => {
  try {
    const pageDefault = page ? page : "1";
    const skip = Number(pageDefault) * 20 - 20;

    const result = await db.companies.findMany({
      skip,
      take: 20,
      where: {
        ...(search && {
          OR: [
            { company_name: { contains: search } },
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
