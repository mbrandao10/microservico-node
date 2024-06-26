import { userUpdateSchema, UpdateUserType } from "../types";

export type OutsideUpdateUser<A> = (data: UpdateUserType) => Promise<A>;

type UpdateUser = <A>(
  outsideUpdate: OutsideUpdateUser<A>
) => (data: UpdateUserType) => Promise<A>;

export const updateUser: UpdateUser = (outsideUpdate) => async (data) => {
  userUpdateSchema.validateSync(data);
  const result = await outsideUpdate(data);

  return result;
};
