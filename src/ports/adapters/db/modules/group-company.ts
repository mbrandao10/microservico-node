import { CreateGroupCompanyType, UpdateGroupCompanyType } from "@/core/group-companies/types";
import { database as db } from "../db";
import { 
  DeleteGroupCompanyType,
  FindByIdGroupCompanyType,
  FindAllGroupCompanyType,
  FindByIdsGroupCompanyType
} from "../types";

export const registerGroupCompanyInDB = async (input: CreateGroupCompanyType) => {
  const result = await db.registerGroupCompany(input);
  return result;
};

export const findGroupCompanyById = async (input: FindByIdGroupCompanyType) => {
  const result = await db.findGroupCompanyById(input);
  return result;
};

export const findGroupCompanyByIds = async (input: FindByIdsGroupCompanyType) => {
  const result = await db.findGroupCompanyByIds(input);
  return result;
};

export const findAllGroupCompany = async (input: FindAllGroupCompanyType) => {
  const result = await db.findAllGroupCompanies(input);
  return result;
};

export const updateGroupCompanyInDB = async (input: UpdateGroupCompanyType) => {
  const result = await db.updateGroupCompany(input);
  return result;
};

export const deleteGroupCompanyInDB = async (input: DeleteGroupCompanyType) => {
  const result = await db.deleteGroupCompanyInDB(input);
  return result;
};
