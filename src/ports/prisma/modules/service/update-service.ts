import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Services } from "@prisma/client";
import { UpdateServiceInDB } from "@/ports/adapters/db";

export const updateService: UpdateServiceInDB<Services> = async (
  data
): Promise<Services> => {
  try {
    const service = await db.services.findUnique({
      where: { id: data.service_id }
    });

    if (!service) {
      throw new ValidationError("service not found");
    }


    const result = await db.services.update({
      where: { id: data.service_id },
      data: {
        company_id: data.company_id,
        name: data.name,
        type: "TOTEM",
        availability: data.availability,
        active: data.active,
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to update service");
    }

    if (error instanceof ValidationError) {
      throw new ValidationError(error.message);
    }

    if (error instanceof ConflictError) {
      throw error;
    }

    throw new UnknownError();
  }
};