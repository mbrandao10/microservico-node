import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Organizations } from "@prisma/client";
import { UpdateOrganizationInDB } from "@/ports/adapters/db";

export const updateOrganization: UpdateOrganizationInDB<Organizations> = async (
  data
): Promise<Organizations> => {
  try {
    const organization = await db.organizations.findUnique({
      where: { id: data.organization_id }
    });

    if (!organization) {
      throw new ValidationError("Organization not found");
    }

    const result = await db.organizations.update({
      where: { id: data.organization_id },
      data: {
        name: data.name,
        contact_in_charge: data.contact_in_charge,
        active: data.active
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to update organization");
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