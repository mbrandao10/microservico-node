import { 
  CreateServiceType,
  UpdateServiceType
} from "@/core/service/types";
import { database as db } from "../db";
import { 
  DeleteServiceType,
  FindAllServiceType,
  FindByIdServiceType
} from "../types";

export const registerServiceInDB = async (input: CreateServiceType) => {
  const result = await db.registerService(input);
  return result;
};

export const findServiceById = async (input: FindByIdServiceType) => {
  const result = await db.findServiceById(input);
  return result;
};

export const findAllServices = async (input: FindAllServiceType) => {
  const result = await db.findAllServices(input);
  return result;
};

export const updateServiceInDB = async (input: UpdateServiceType) => {
  const result = await db.updateService(input);
  return result;
};

export const deleteServiceInDB = async (input: DeleteServiceType) => {
  const result = await db.deleteServiceInDB(input);
  return result;
};
