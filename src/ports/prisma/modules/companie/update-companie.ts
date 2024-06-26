import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Companies } from "@prisma/client";
import { UpdateCompanieInDB } from "@/ports/adapters/db";
import { CategoriesType } from "@/core/companie/types";

export const updateCompanie: UpdateCompanieInDB<Companies> = async (
  data
): Promise<Companies> => {
  try {
    const companie = await db.companies.findUnique({
      where: { id: data.companie_id }
    });

    if (!companie) {
      throw new ValidationError("Companie not found");
    }

    let categorie = null;

    if (data.categories !== undefined && data.categories !== null) {
      const categoriesKey = data.categories as keyof typeof CategoriesType;
    
      if (categoriesKey in CategoriesType) {
        categorie = CategoriesType[categoriesKey];
      }
    }

    const result = await db.companies.update({
      where: { id: data.companie_id },
      data: {
        organization_id: data.organization_id,
        company_logo: data.company_logo,
        company_name: data.company_name,
        trade_name: data.trade_name,
        document_number: data.document_number,
        address: data.address,
        contact_in_charge: data.contact_in_charge,
        services_ids: data.services_ids,
        categories: categorie,
        active: data.active,
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to update Companie");
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