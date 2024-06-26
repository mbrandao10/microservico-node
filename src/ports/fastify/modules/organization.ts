import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";
import {
  findOrganizationById,
  findAllOrganizations,
  deleteOrganization,
  registerOrganization,
  updateOrganization
} from "@/ports/adapters/http/modules/organization";
import { CreateOrganizationType, UpdateOrganizationType } from "@/core/organization/types";
import {
  deleteOrganizationSchema,
  findAllOrganizationsSchema,
  findOrganizationByIdSchema,
  updateOrganizationSchema,
  organizationSchema
} from "../schema";

import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";

export const organizationRoutes = async () => {

  type OrganizationRequest = {
    Body: CreateOrganizationType;
    Params: { organization_id: string };
  };
  app.post<OrganizationRequest>(
    "/organizations",
    { 
      schema: organizationSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const organization = await registerOrganization(req.body);

        const responseData = {
          id: organization.id,
          name: organization.name,
          contact_in_charge: organization.contact_in_charge,
          created_at: organization.created_at,
          updated_at: organization.updated_at
        };

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.get<OrganizationRequest>(
    "/organizations/:organization_id",
    {
      schema: findOrganizationByIdSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const { organization_id } = req.params;

        const payload = {
          organization_id: organization_id
        };

        const result = await findOrganizationById(payload);

        reply.status(200).send(result);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type FindAllOrganizationRequest = {
    Querystring: {
      page?: string;
      search?: string;
    };
  };

  app.get<FindAllOrganizationRequest>(
    "/organizations",
    { schema: findAllOrganizationsSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        console.log(req.raw.user.permissions, "permissions");
        
        const { page, search } = req.query;
        const response = await findAllOrganizations({
          page,
          search
        });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UpdateOrdanizationTypeOmit = Omit<UpdateOrganizationType, "organization_id">;
  type OrganizationUpdateRequest = {
    Body: UpdateOrdanizationTypeOmit;
    Params: { organization_id: string };
  };
  app.patch<OrganizationUpdateRequest>(
    "/organizations/:organization_id",
    { schema: updateOrganizationSchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { organization_id } = req.params;
        const body = req.body;

        const response = await updateOrganization({ organization_id, ...body });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type OrganizationDeleteRequest = {
    Params: { organization_id: string };
  };
  app.delete<OrganizationDeleteRequest>(
    "/organizations/:organization_id",
    { schema: deleteOrganizationSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { organization_id } = req.params;

        await deleteOrganization({ organization_id });
        reply.status(204).send();
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
