import { companieUpdateSchema, UpdateCompanieType } from "../types";

export type OutsideUpdateCompanie<A> = (data: UpdateCompanieType) => Promise<A>;

type UpdateCompanie = <A>(
  outsideUpdate: OutsideUpdateCompanie<A>
) => (data: UpdateCompanieType) => Promise<A>;

export const updateCompanie: UpdateCompanie = (outsideUpdate) => async (data) => {
  companieUpdateSchema.validateSync(data);
  const result = await outsideUpdate(data);

  return result;
};
