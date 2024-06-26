import { db } from "@/ports/prisma/prisma";
import { UnknownError, ValidationError } from "@/helpers/error";
import { DeleteCompanieInDB } from "@/ports/adapters/db";

export const deleteCompanieInDB:DeleteCompanieInDB = async ({ companie_id }) => {
  try {
    await db.companies.update({
      where: {
        id: companie_id
      },
      data: {
        deleted: true
      }
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new UnknownError();
    }

    throw new ValidationError("Error at delete companie");
  }
};
