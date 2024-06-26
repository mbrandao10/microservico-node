import {
  findAllOrganizations,
} from "@/ports/adapters/http/modules/organization";
import { findOrganizationGrpc, findAllOrganizationsByIds } from "@/ports/prisma";

export const FindOrganizationById = async (data: any, callback: any) => {
  try {
    const dataOrganization = await findOrganizationGrpc(data.request.organization_id);
    callback(null, dataOrganization);
  } catch (error) {
    callback(error, null);
  }
};

export const FindAllUsersByIds = async (data: any, callback: any) => {
  try {
    const dataOrganizations = await findAllOrganizationsByIds(data.request.organization_ids);
    callback(null, {
      data: dataOrganizations
    });
  } catch (error) {
    callback(error, null);
  }
};

export const FindAllOrganizations = async (_data: any, callback: any) => {
  try {
    const dataOrganizations = await findAllOrganizations({ page: "1" });
    callback(null, { data: dataOrganizations });
  } catch (error) {
    callback(error, null);
  }
};