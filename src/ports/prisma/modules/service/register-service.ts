import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Services } from "@prisma/client";
import { RegisterServiceInDB } from "@/ports/adapters/db";

export const registerService: RegisterServiceInDB<Services> = async (
  data
): Promise<Services> => {
  try {
    const company = await db.companies.findUnique({
      where: { id: data.company_id }
    });

    if (!company) {
      throw new ValidationError("company not found");
    }


    
    const result = await db.services.create({
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
      throw new ValidationError("Failed to register service");
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
