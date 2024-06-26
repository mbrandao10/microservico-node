import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError } from "@/helpers/error";
import { ValidationError } from "yup";

export const findGroupCompanyGrpc = async (id: string) => {
  try {
    const result = await db.groupCompanies.findUnique({
      where: { id }
    });

    if (!result) {
      return null;
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

    throw new ValidationError("Error on find group company by id");
  }
};

export const findAllGroupCompaniesByIds = async (groupCompaniesId: string[]) => {

  try {
    const result = await db.groupCompanies.findMany({
      where: {
        id: {
          in: groupCompaniesId
        }
      },
      select: {
        id: true,
        name: true,
        company_ids: true,
        organization_id: true,
        default: true,
        active: true,
      }
    });

    if (!result) {
      return null;
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

    throw new ValidationError("Error on find group companies by id");
  }
};
