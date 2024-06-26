import { CreateOrganizationType, UpdateOrganizationType } from "@/core/organization/types";
import request from "supertest";
// import { app } from "./server";


type CreateOrganizationProps = {
  token: string;
  organization: CreateOrganizationType;
};
export const resgisterOrganization = async (app: any, data: CreateOrganizationProps) => {
  return request(app)
    .post("/organizations")
    .send(data.organization)
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

type FindOrganizationByIdProps = {
  token: string;
  organization_id: string;
};
export const findOrganizationById = async (app: any, data: FindOrganizationByIdProps) => {
  return request(app)
    .get(`/organizations/${data.organization_id}`)
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

type DeleteOrganizationByIdProps = {
  token: string;
  organization_id: string;
};
export const deleteOrganizationById = async (app: any, data: DeleteOrganizationByIdProps) => {
  return request(app)
    .delete(`/organizations/${data.organization_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type UpdateOrganizationByIdProps = {
  token: string;
  organization_id: string;
  data: UpdateOrganizationType;
};
export const updateOrganizationById = async (app: any, {
  organization_id,
  data,
  token
}: UpdateOrganizationByIdProps) => {
  return request(app)
    .patch(`/organizations/${organization_id}`)
    .send(data)
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json");
};
