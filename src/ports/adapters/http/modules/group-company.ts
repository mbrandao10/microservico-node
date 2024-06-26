import { CreateGroupCompanyType, UpdateGroupCompanyType } from "@/core/group-companies/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as groupCompany from "@/core/group-companies/use-cases";

export const registerGroupCompany = async (input: CreateGroupCompanyType) => {
  const result = await groupCompany.registerGroupCompany(dbAdpter.registerGroupCompanyInDB)(input);
  return result;
};

export const findGroupCompanyById = async (data: dbAdpter.FindByIdGroupCompanyType) => {
  const result = await dbAdpter.findGroupCompanyById(data);
  return result;
};

export const findAllGroupCompanies = async (data: dbAdpter.FindAllGroupCompanyType) => {
  const result = await dbAdpter.findAllGroupCompany(data);
  return result;
};

export const updateGroupCompany = async (data: UpdateGroupCompanyType) => {
  const result = await groupCompany.updateGroupCompany(dbAdpter.updateGroupCompanyInDB)(data);
  return result;
};

export const deleteGroupCompany = async (data: dbAdpter.DeleteGroupCompanyType) => {
  const result = await dbAdpter.deleteGroupCompanyInDB(data);
  return result;
};

