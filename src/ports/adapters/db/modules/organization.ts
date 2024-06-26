import { CreateOrganizationType, UpdateOrganizationType } from "@/core/organization/types";
import { database as db } from "../db";
import { 
  DeleteOrganizationType,
  FindByIdOrganizationType,
  FindAllOrganizationType
} from "../types";

export const registerOrganizationInDB = async (input: CreateOrganizationType) => {
  const result = await db.registerOrganization(input);
  return result;
};

export const findOrganizationById = async (input: FindByIdOrganizationType) => {
  const result = await db.findOrganizationById(input);
  return result;
};

export const findAllOrganization = async (input: FindAllOrganizationType) => {
  const result = await db.findAllOrganizations(input);
  return result;
};

export const updateOrganizationInDB = async (input: UpdateOrganizationType) => {
  const result = await db.updateOrganization(input);
  return result;
};

export const deleteOrganizationInDB = async (input: DeleteOrganizationType) => {
  const result = await db.deleteOrganizationInDB(input);
  return result;
};
