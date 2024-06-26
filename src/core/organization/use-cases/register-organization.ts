import { organizationSchema, CreateOrganizationType } from "../types";

export type OutsideCreateOrganization<A> = (data: CreateOrganizationType) => Promise<A>;

type CreateOrganization = <A>(
  outsideRegister: OutsideCreateOrganization<A>
) => (data: CreateOrganizationType) => Promise<A>;

export const registerOrganization: CreateOrganization = (outsideRegiste) => async (data) => {
  organizationSchema.validateSync(data);
  const result = await outsideRegiste(data);
  return result;
};
