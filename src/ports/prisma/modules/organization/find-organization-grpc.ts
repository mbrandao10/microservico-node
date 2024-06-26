import { db } from "@/ports/prisma/prisma";
import { NotFoundError, UnknownError } from "@/helpers/error";
import { ValidationError } from "yup";

export const findOrganizationGrpc = async (id: string) => {
  try {
    const result = await db.organizations.findUnique({
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

    throw new ValidationError("Error on find organization by id");
  }
};

export const findAllOrganizationsByIds = async (organizationIds: string[]) => {

  try {
    const result = await db.organizations.findMany({
      where: {
        id: {
          in: organizationIds
        }
      },
      select: {
        id: true,
        name: true,
        contact_in_charge: true,
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

    throw new ValidationError("Error on find organizations by id");
  }
};
