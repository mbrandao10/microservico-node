import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Organizations } from "@prisma/client";
import { FindAllOrganizationInDB } from "@/ports/adapters/db";

export const findAllOrganizations: FindAllOrganizationInDB<Organizations[]> = async ({
  page,
  search
}): Promise<Organizations[]> => {
  try {
    const pageDefault = page ? page : "1";
    const skip = Number(pageDefault) * 20 - 20;

    const result = await db.organizations.findMany({
      skip,
      take: 20,
      where: {
        ...(search && {
          OR: [
            { name: { contains: search } },
            // { email: { contains: search } },
            // { document_number: { contains: search } }
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
