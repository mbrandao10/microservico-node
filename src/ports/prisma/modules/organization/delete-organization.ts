import { db } from "@/ports/prisma/prisma";
import { UnknownError, ValidationError } from "@/helpers/error";
import { DeleteOrganizationInDB } from "@/ports/adapters/db";

export const deleteOrganizationInDB:DeleteOrganizationInDB = async ({ organization_id }) => {
  try {
    await db.organizations.update({
      where: {
        id: organization_id
      },
      data: {
        deleted: true
      }
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    throw new ValidationError("Error at delete organization");
  }
};
