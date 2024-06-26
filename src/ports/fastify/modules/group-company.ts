import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";
import {
  findGroupCompanyById,
  findAllGroupCompanies,
  deleteGroupCompany,
  registerGroupCompany,
  updateGroupCompany
} from "@/ports/adapters/http/modules/group-company";
import { CreateGroupCompanyType, UpdateGroupCompanyType } from "@/core/group-companies/types";
import {
  deleteGroupCompanySchema,
  findAllGroupCompanySchema,
  findGroupCompanyByIdSchema,
  updateGroupCompanySchema,
  groupCompanySchema
} from "../schema";

import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";

export const groupCompanyRoutes = async () => {

  type GroupCompanyRequest = {
    Body: CreateGroupCompanyType;
    Params: { group_company_id: string };
  };
  app.post<GroupCompanyRequest>(
    "/group-company",
    { 
      schema: groupCompanySchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const groupCompany = await registerGroupCompany(req.body);

        const responseData = {
          id: groupCompany.id,
          name: groupCompany.name,
          company_ids: groupCompany.company_ids,
          default: groupCompany.default,
          active: groupCompany.active,
          organization_id: groupCompany.organization_id,
          created_at: groupCompany.created_at,
          updated_at: groupCompany.updated_at
        };

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.get<GroupCompanyRequest>(
    "/group-company/:group_company_id",
    {
      schema: findGroupCompanyByIdSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const { group_company_id } = req.params;

        const payload = {
          group_company_id: group_company_id
        };

        const result = await findGroupCompanyById(payload);

        reply.status(200).send(result);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type FindAllGroupCompanyRequest = {
    Querystring: {
      page?: string;
      search?: string;
    };
  };

  app.get<FindAllGroupCompanyRequest>(
    "/group-company",
    { schema: findAllGroupCompanySchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { page, search } = req.query;
        const response = await findAllGroupCompanies({
          page,
          search
        });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UpdateGroupCompanyTypeOmit = Omit<UpdateGroupCompanyType, "group_company_id">;
  type GroupCompanyUpdateRequest = {
    Body: UpdateGroupCompanyTypeOmit;
    Params: { group_company_id: string };
  };
  app.patch<GroupCompanyUpdateRequest>(
    "/group-company/:group_company_id",
    { schema: updateGroupCompanySchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { group_company_id } = req.params;
        const body = req.body;

        const response = await updateGroupCompany({ group_company_id, ...body });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type GroupCompanyDeleteRequest = {
    Params: { group_company_id: string };
  };
  app.delete<GroupCompanyDeleteRequest>(
    "/group-company/:group_company_id",
    { schema: deleteGroupCompanySchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { group_company_id } = req.params;

        await deleteGroupCompany({ group_company_id });
        reply.status(204).send();
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
