import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Organizations } from "@prisma/client";
// import { hashPassword } from "@/util/hash-password";
// import { generateCode } from "@/util/generete-code";
import { RegisterOrganizationInDB } from "@/ports/adapters/db";

export const registerOrganization: RegisterOrganizationInDB<Organizations> = async (
  data
): Promise<Organizations> => {
  try {
    const result = await db.organizations.create({
      data: {
        name: data.name,
        contact_in_charge: data.contact_in_charge,
        active: data.active ?? true
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to register organization");
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
