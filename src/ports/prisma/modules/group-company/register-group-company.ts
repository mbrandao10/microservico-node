import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { GroupCompanies } from "@prisma/client";
import { RegisterGroupCompanyInDB } from "@/ports/adapters/db";
import { findCompaniesByOrganizationId } from "../companie";

export const registerGroupCompany: RegisterGroupCompanyInDB<GroupCompanies> = async (
  data
): Promise<GroupCompanies> => {
  try {
    const organization = await db.organizations.findUnique({
      where: { id: data.organization_id }
    });

    if (!organization) {
      throw new ValidationError("Organization not found");
    }

    let company_ids: string[] = [];
    if (data.default) {
      const companys = await findCompaniesByOrganizationId({organization_id: data.organization_id})
      company_ids = companys.map(company => company.id);
    }
    
    const result = await db.groupCompanies.create({
      data: {
        name: data.name,
        default: data.default,
        active: data.active,
        organization_id: data.organization_id,
        company_ids: data.default ? company_ids : data.company_ids
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to register group company");
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
