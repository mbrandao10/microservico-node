import { db } from "@/ports/prisma/prisma";
import { UnknownError, ValidationError } from "@/helpers/error";
import { DeleteGroupCompanyInDB } from "@/ports/adapters/db";

export const deleteGroupCompanyInDB:DeleteGroupCompanyInDB = async ({ group_company_id }) => {
  try {
    await db.groupCompanies.update({
      where: {
        id: group_company_id
      },
      data: {
        deleted: true
      }
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    throw new ValidationError("Error at delete group company");
  }
};
