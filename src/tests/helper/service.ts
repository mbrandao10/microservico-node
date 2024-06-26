import { CreateServiceType, UpdateServiceType } from "@/core/service/types";
import request from "supertest";
// import { app } from "./server";

type CreateServiceProps = {
  token: string;
  service: CreateServiceType;
};
export const resgisterService = async (app: any, data: CreateServiceProps) => {
  return request(app)
    .post("/service")
    .send(data.service)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};


type FindServiceByIdProps = {
  token: string;
  service_id: string;
};
export const findServiceById = async (app: any, data: FindServiceByIdProps) => {
  return request(app)
    .get(`/service/${data.service_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type DeleteServiceByIdProps = {
  token: string;
  service_id: string;
};
export const deleteServiceById = async (app: any, data: DeleteServiceByIdProps) => {
  return request(app)
    .delete(`/service/${data.service_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type UpdateServiceByIdProps = {
  token: string;
  service_id: string;
  data: UpdateServiceType;
};
export const updateServiceById = async (app: any, {
  service_id,
  data,
  token
}: UpdateServiceByIdProps) => {
  return request(app)
    .patch(`/service/${service_id}`)
    .send({
      ...data,
    })
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json");
};
