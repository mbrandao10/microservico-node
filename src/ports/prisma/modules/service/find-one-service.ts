import { db } from "@/ports/prisma/prisma";
import {
  ForbiddenError,
  NotFoundError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { Services } from "@prisma/client";
import { FindByIdServiceInDB } from "@/ports/adapters/db/types";

export const findServiceById: FindByIdServiceInDB<Services> = async (
  data
): Promise<Services> => {
  try {
    const result = await db.services.findUnique({
      where: { id: data.service_id }
    });

    if (!result) {
      throw new NotFoundError("Service not found");
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

    throw new ValidationError("Error on find service by id");
  }
};
