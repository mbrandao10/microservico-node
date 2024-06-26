import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Services } from "@prisma/client";
import { FindServiceByCompanyIdInDB } from "@/ports/adapters/db";

export const findServicesByCompanieId: FindServiceByCompanyIdInDB<Services[]> = async ({
  companie_id,
}): Promise<Services[]> => {
  try {

    const result = await db.services.findMany({
      where: {
        company_id: companie_id
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
