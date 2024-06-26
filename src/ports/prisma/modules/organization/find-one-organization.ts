import { db } from "@/ports/prisma/prisma";
import {
  ForbiddenError,
  NotFoundError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { Organizations } from "@prisma/client";
import { FindByIdOrganizationInDB } from "@/ports/adapters/db/types";

export const findOrganizationById: FindByIdOrganizationInDB<Organizations> = async (
  data
): Promise<Organizations> => {
  try {
    const result = await db.organizations.findUnique({
      where: { id: data.organization_id }
    });

    if (!result) {
      throw new NotFoundError("Organization not found");
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

    throw new ValidationError("Error on find organization by id");
  }
};
