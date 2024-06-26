import { serviceUpdateSchema, UpdateServiceType } from "../types";

export type OutsideUpdateCompanie<A> = (data: UpdateServiceType) => Promise<A>;

type UpdateCompanie = <A>(
  outsideUpdate: OutsideUpdateCompanie<A>
) => (data: UpdateServiceType) => Promise<A>;

export const updateService: UpdateCompanie = (outsideUpdate) => async (data) => {
  serviceUpdateSchema.validateSync(data);
  const result = await outsideUpdate(data);

  return result;
};
