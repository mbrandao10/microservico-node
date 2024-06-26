import { CreateGroupCompanyType, groupCompanySchema } from "../types";

export type OutsideCreateGroupCompany<A> = (data: CreateGroupCompanyType) => Promise<A>;

type CreateGroupCompany = <A>(
  outsideRegister: OutsideCreateGroupCompany<A>
) => (data: CreateGroupCompanyType) => Promise<A>;

export const registerGroupCompany: CreateGroupCompany = (outsideRegiste) => async (data) => {
  groupCompanySchema.validateSync(data);
  const result = await outsideRegiste(data);
  return result;
};
