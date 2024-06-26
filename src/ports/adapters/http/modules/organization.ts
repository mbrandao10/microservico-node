import { CreateOrganizationType, UpdateOrganizationType } from "@/core/organization/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as organization from "@/core/organization/use-cases";

export const registerOrganization = async (input: CreateOrganizationType) => {
  const result = await organization.registerOrganization(dbAdpter.registerOrganizationInDB)(input);
  return result;
};

export const findOrganizationById = async (data: dbAdpter.FindByIdOrganizationType) => {
  const result = await dbAdpter.findOrganizationById(data);
  return result;
};

export const findAllOrganizations = async (data: dbAdpter.FindAllOrganizationType) => {
  const result = await dbAdpter.findAllOrganization(data);
  return result;
};

export const updateOrganization = async (data: UpdateOrganizationType) => {
  const result = await organization.updateOrganization(dbAdpter.updateOrganizationInDB)(data);
  return result;
};

export const deleteOrganization = async (data: dbAdpter.DeleteOrganizationType) => {
  const result = await dbAdpter.deleteOrganizationInDB(data);
  return result;
};

