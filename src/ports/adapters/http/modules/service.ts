import { CreateServiceType, UpdateServiceType } from "@/core/service/types";
import * as dbAdpter from "@/ports/adapters/db";
import * as service from "@/core/service/use-cases";

export const registerService = async (input: CreateServiceType) => {
  const result = await service.registerService(dbAdpter.registerServiceInDB)(input);
  return result;
};

export const findServiceById = async (data: dbAdpter.FindByIdServiceType) => {
  const result = await dbAdpter.findServiceById(data);
  return result;
};

export const findAllServices = async (data: dbAdpter.FindAllServiceType) => {
  const result = await dbAdpter.findAllServices(data);
  return result;
};

export const updateService = async (data: UpdateServiceType) => {
  const result = await service.updateService(dbAdpter.updateServiceInDB)(data);
  return result;
};

export const deleteService = async (data: dbAdpter.DeleteServiceType) => {
  const result = await dbAdpter.deleteServiceInDB(data);
  return result;
};

