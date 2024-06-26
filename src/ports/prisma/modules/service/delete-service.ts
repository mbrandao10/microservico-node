import { db } from "@/ports/prisma/prisma";
import { UnknownError, ValidationError } from "@/helpers/error";
import { DeleteServiceInDB } from "@/ports/adapters/db";

export const deleteServiceInDB:DeleteServiceInDB = async ({ service_id }) => {
  try {
    await db.services.update({
      where: {
        id: service_id
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
