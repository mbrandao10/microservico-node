import { groupCompanyUpdateSchema, UpdateGroupCompanyType } from "../types";

export type OutsideUpdateGroupCompany<A> = (data: UpdateGroupCompanyType) => Promise<A>;

type UpdateGroupCompany = <A>(
  outsideUpdate: OutsideUpdateGroupCompany<A>
) => (data: UpdateGroupCompanyType) => Promise<A>;

export const updateGroupCompany: UpdateGroupCompany = (outsideUpdate) => async (data) => {
  groupCompanyUpdateSchema.validateSync(data);
  const result = await outsideUpdate(data);

  return result;
};
