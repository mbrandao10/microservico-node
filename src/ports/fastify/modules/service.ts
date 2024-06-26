import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";
import {
  findServiceById,
  findAllServices,
  deleteService,
  registerService,
  updateService
} from "@/ports/adapters/http/modules/service";
import { CreateServiceType, UpdateServiceType } from "@/core/service/types";
import {
  deleteServiceSchema,
  findAllServiceSchema,
  findServiceByIdSchema,
  updateServiceSchema,
  serviceSchema
} from "../schema";

import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";

export const serviceRoutes = async () => {

  type ServiceRequest = {
    Body: CreateServiceType;
    Params: { service_id: string };
  };
  app.post<ServiceRequest>(
    "/service",
    { 
      schema: serviceSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const service = await registerService(req.body);

        const responseData = service;

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.get<ServiceRequest>(
    "/service/:service_id",
    {
      schema: findServiceByIdSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const { service_id } = req.params;

        const payload = {
          service_id: service_id
        };

        const result = await findServiceById(payload);

        reply.status(200).send(result);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type FindAllServiceRequest = {
    Querystring: {
      page?: string;
      search?: string;
    };
  };

  app.get<FindAllServiceRequest>(
    "/service",
    { schema: findAllServiceSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { page, search } = req.query;
        const response = await findAllServices({
          page,
          search
        });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UpdateServiceTypeOmit = Omit<UpdateServiceType, "service_id">;
  type ServiceUpdateRequest = {
    Body: UpdateServiceTypeOmit;
    Params: { service_id: string };
  };
  app.patch<ServiceUpdateRequest>(
    "/service/:service_id",
    { schema: updateServiceSchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { service_id } = req.params;
        const body = req.body;

        const response = await updateService({ service_id, ...body });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type ServiceDeleteRequest = {
    Params: { service_id: string };
  };
  app.delete<ServiceDeleteRequest>(
    "/service/:service_id",
    { schema: deleteServiceSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { service_id } = req.params;

        await deleteService({ service_id });
        reply.status(204).send();
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
