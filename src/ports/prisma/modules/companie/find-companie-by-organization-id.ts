import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError, ValidationError } from "@/helpers/error";
import { Companies } from "@prisma/client";
import { FindompanyByOrganizationIdInDB } from "@/ports/adapters/db";

export const findCompaniesByOrganizationId: FindompanyByOrganizationIdInDB<Companies[]> = async ({
  organization_id,
}): Promise<Companies[]> => {
  try {

    const result = await db.companies.findMany({
      where: {
        organization_id: organization_id
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
