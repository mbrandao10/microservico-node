import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { GroupCompanies } from "@prisma/client";
import { UpdateGroupCompanyInDB } from "@/ports/adapters/db";

export const updateGroupCompany: UpdateGroupCompanyInDB<GroupCompanies> = async (
  data
): Promise<GroupCompanies> => {
  try {
    const organization = await db.organizations.findUnique({
      where: { id: data.organization_id }
    });

    if (!organization) {
      throw new ValidationError("Organization not found");
    }

    const result = await db.groupCompanies.update({
      where: { id: data.group_company_id },
      data: {
        name: data.name,
        default: data.default,
        active: data.active,
        organization_id: data.organization_id,
        company_ids: data.company_ids
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