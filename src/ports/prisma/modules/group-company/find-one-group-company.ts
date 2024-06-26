import { db } from "@/ports/prisma/prisma";
import {
  ForbiddenError,
  NotFoundError,
  UnknownError,
  ValidationError
} from "@/helpers/error";
import { GroupCompanies } from "@prisma/client";
import { FindByIdGroupCompanyInDB } from "@/ports/adapters/db/types";

export const findGroupCompanyById: FindByIdGroupCompanyInDB<GroupCompanies> = async (
  data
): Promise<GroupCompanies> => {
  try {
    const result = await db.groupCompanies.findUnique({
      where: { id: data.group_company_id }
    });

    if (!result) {
      throw new NotFoundError("Group Company not found");
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

    throw new ValidationError("Error on find group company by id");
  }
};
