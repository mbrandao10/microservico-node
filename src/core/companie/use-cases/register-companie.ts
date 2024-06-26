import { companieSchema, CreateCompanieType } from "../types";

export type OutsideRegisterCompanie<A> = (data: CreateCompanieType) => Promise<A>;

type RegisterCompanie = <A>(
  outsideRegister: OutsideRegisterCompanie<A>
) => (data: CreateCompanieType) => Promise<A>;

export const registerCompanie: RegisterCompanie = (outsideRegiste) => async (data) => {  
  companieSchema.validateSync(data);
  const result = await outsideRegiste(data);
  return result;
};
