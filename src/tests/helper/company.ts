import { CreateCompanieType, UpdateCompanieType } from "@/core/companie/types";
import request from "supertest";
// import { app } from "./server";

type CreateCompanyProps = {
  token: string;
  company: CreateCompanieType;
};
export const resgisterCompany = async (app: any, data: CreateCompanyProps) => {
  return request(app)
    .post("/companies")
    .send(data.company)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

// type FindAllUsersProps = {
//   token: string;
// };
// export const findAllUsers = async (data: FindAllUsersProps) => {
//   return request(app)
//     .get("/users")
//     .set("Authorization", `Bearer ${data.token}`)
//     .set("Content-Type", "application/json");
// };

type FindCompanyByIdProps = {
  token: string;
  company_id: string;
};
export const findCompanyById = async (app: any, data: FindCompanyByIdProps) => {
  return request(app)
    .get(`/companies/${data.company_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

// type FindUserByEmailProps = {
//   token: string;
//   email: string;
// };
// export const findUserByEmail = async (data: FindUserByEmailProps) => {
//   return request(app)
//     .get(`/users/email/${data.email}`)
//     .set("Authorization", `Bearer ${data.token}`)
//     .set("Content-Type", "application/json");
// };

type DeleteCompanyByIdProps = {
  token: string;
  company_id: string;
};
export const deleteCompanyById = async (app: any, data: DeleteCompanyByIdProps) => {
  return request(app)
    .delete(`/companies/${data.company_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type UpdateCompanyByIdProps = {
  token: string;
  companie_id: string;
  data: UpdateCompanieType;
};
export const updateCompanyById = async (app: any, {
  companie_id,
  data,
  token
}: UpdateCompanyByIdProps) => {
  return request(app)
    .patch(`/companies/${companie_id}`)
    .send({
      ...data,
    })
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json");
};
