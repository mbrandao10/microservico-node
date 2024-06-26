import { userSchema, CreateUserType } from "../types";

export type OutsideRegisterUser<A> = (data: CreateUserType) => Promise<A>;

type RegisterUser = <A>(
  outsideRegister: OutsideRegisterUser<A>
) => (data: CreateUserType) => Promise<A>;

export const registerUser: RegisterUser = (outsideRegiste) => async (data) => {  
  userSchema.validateSync(data);
  const result = await outsideRegiste(data);
  return result;
};
