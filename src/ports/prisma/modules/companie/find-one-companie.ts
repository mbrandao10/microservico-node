import { db } from "@/ports/prisma/prisma";
import {
  ForbiddenError,
  NotFoundError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { Companies } from "@prisma/client";
import { FindByIdCompanieInDB } from "@/ports/adapters/db/types";

export const findCompanieById: FindByIdCompanieInDB<Companies> = async (
  data
): Promise<Companies> => {
  try {
    const result = await db.companies.findUnique({
      where: { id: data.companie_id }
    });

    if (!result) {
      throw new NotFoundError("Companie not found");
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

    throw new ValidationError("Error on find companie by id");
  }
};
