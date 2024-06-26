import {
  findAllUsers,
} from "@/ports/adapters/http/modules/user";
import { findAllUsersByIds, findUserGrpc } from "@/ports/prisma";

export const FindUserById = async (data: any, callback: any) => {
  try {
    const dataUser = await findUserGrpc(data.request.user_id);
    callback(null, dataUser);
  } catch (error) {
    callback(error, null);
  }
};

export const FindAllUsersByIds = async (data: any, callback: any) => {
  try {
    const dataUsers = await findAllUsersByIds(data.request.user_ids);
    callback(null, {
      data: dataUsers
    });
  } catch (error) {
    callback(error, null);
  }
};

export const FindAllUser = async (_data: any, callback: any) => {
  try {
    const dataUsers = await findAllUsers({ page: "1" });
    callback(null, { data: dataUsers });
  } catch (error) {
    callback(error, null);
  }
};