import { organizationUpdateSchema, UpdateOrganizationType } from "../types";

export type OutsideUpdateOrganization<A> = (data: UpdateOrganizationType) => Promise<A>;

type UpdateOrganization = <A>(
  outsideUpdate: OutsideUpdateOrganization<A>
) => (data: UpdateOrganizationType) => Promise<A>;

export const updateOrganization: UpdateOrganization = (outsideUpdate) => async (data) => {
  organizationUpdateSchema.validateSync(data);
  const result = await outsideUpdate(data);

  return result;
};
