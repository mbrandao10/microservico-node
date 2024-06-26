import { serviceSchema, CreateServiceType } from "../types";

export type OutsideRegisterService<A> = (data: CreateServiceType) => Promise<A>;

type RegisterService = <A>(
  outsideRegister: OutsideRegisterService<A>
) => (data: CreateServiceType) => Promise<A>;

export const registerService: RegisterService = (outsideRegiste) => async (data) => {  
  serviceSchema.validateSync(data);
  const result = await outsideRegiste(data);
  return result;
};