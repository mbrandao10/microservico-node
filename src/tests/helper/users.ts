import { CreateUserType } from "@/core/user/types";
import request from "supertest";

export const resgisterUser = async (app: any, data: CreateUserType) => {
  return request(app)
    .post("/users")
    .send({
      ...data
    })
    .set("Content-Type", "application/json");
};

type FindAllUsersProps = {
  token: string;
};
export const findAllUsers = async (app: any, data: FindAllUsersProps) => {
  return request(app)
    .get("/users")
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type FindUserByIdProps = {
  token: string;
  user_id: string;
};
export const findUserById = async (app: any, data: FindUserByIdProps) => {
  return request(app)
    .get(`/users/${data.user_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type FindUserByEmailProps = {
  token: string;
  email: string;
};
export const findUserByEmail = async (app: any, data: FindUserByEmailProps) => {
  return request(app)
    .get(`/users/email/${data.email}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type DeleteUserByIdProps = {
  token: string;
  user_id: string;
};
export const deleteUserById = async (app: any, data: DeleteUserByIdProps) => {
  return request(app)
    .delete(`/users/${data.user_id}`)
    .set("Authorization", `Bearer ${data.token}`)
    .set("Content-Type", "application/json");
};

type UpdateUserByIdProps = {
  token: string;
  user_id: string;
  data: CreateUserType;
};
export const updateUserById = async (app: any, {
  user_id,
  data,
  token
}: UpdateUserByIdProps) => {
  return request(app)
    .patch(`/users/${user_id}`)
    .send({
      ...data,
    })
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json");
};
