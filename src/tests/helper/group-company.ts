import { CreateGroupCompanyType, UpdateGroupCompanyType } from "@/core/group-companies/types";
import request from "supertest";

type CreateGroupCompanyProps = {
  token: string;
  group_company: CreateGroupCompanyType;
};
export const resgisterGroupCompany = async (app: any, data: CreateGroupCompanyProps) => {
  return request(app)
    .post("/group-company")
    .send(data.group_company)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type FindAllGroupCompanyProps = {
  token: string;
};
export const findAllGroupCompanies = async (app: any, data: FindAllGroupCompanyProps) => {
  return request(app)
    .get("/group-company?page=1")
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type FindGroupCompanyByIdProps = {
  token: string;
  group_company_id: string;
};
export const findGroupCompanyById = async (app: any, data: FindGroupCompanyByIdProps) => {
  // console.log(data, "data");
  
  return request(app)
    .get(`/group-company/${data.group_company_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type DeleteGroupCompanyByIdProps = {
  token: string;
  group_company_id: string;
};
export const deleteUGroupCompanyById = async (app: any, data: DeleteGroupCompanyByIdProps) => {
  return request(app)
    .delete(`/group-company/${data.group_company_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type UpdateGroupCompanieIdByIdProps = {
  token: string;
  group_company_id: string;
  data: UpdateGroupCompanyType;
};
export const updateGroupCompanyById = async (app: any, {
  group_company_id,
  data,
  token
}: UpdateGroupCompanieIdByIdProps) => {
  return request(app)
    .patch(`/group-company/${group_company_id}`)
    .send(data)
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json");
};
