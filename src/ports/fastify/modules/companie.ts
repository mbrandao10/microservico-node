import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";
import {
  findCompanieById,
  findAllCompanies,
  deleteCompanie,
  registerCompanie,
  updateCompanie
} from "@/ports/adapters/http/modules/companie";
import { CreateCompanieType, UpdateCompanieType } from "@/core/companie/types";
import {
  deleteCompanieSchema,
  findAllCompaniesSchema,
  findCompanieByIdSchema,
  updateCompanieSchema,
  companieSchema
} from "../schema";

import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";

export const companieRoutes = async () => {

  type CompanieRequest = {
    Body: CreateCompanieType;
    Params: { companie_id: string };
  };
  app.post<CompanieRequest>(
    "/companies",
    { 
      schema: companieSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const companie = await registerCompanie(req.body);

        const responseData = companie;

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.get<CompanieRequest>(
    "/companies/:companie_id",
    {
      schema: findCompanieByIdSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const { companie_id } = req.params;

        const payload = {
          companie_id: companie_id
        };

        const result = await findCompanieById(payload);

        reply.status(200).send(result);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type FindAllCompanieRequest = {
    Querystring: {
      page?: string;
      search?: string;
    };
  };

  app.get<FindAllCompanieRequest>(
    "/companies",
    { schema: findAllCompaniesSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { page, search } = req.query;
        const response = await findAllCompanies({
          page,
          search
        });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UpdateCompanieTypeOmit = Omit<UpdateCompanieType, "companie_id">;
  type CompanieUpdateRequest = {
    Body: UpdateCompanieTypeOmit;
    Params: { companie_id: string };
  };
  app.patch<CompanieUpdateRequest>(
    "/companies/:companie_id",
    { schema: updateCompanieSchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { companie_id } = req.params;
        const body = req.body;

        const response = await updateCompanie({ companie_id, ...body });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type CompanieDeleteRequest = {
    Params: { companie_id: string };
  };
  app.delete<CompanieDeleteRequest>(
    "/companies/:companie_id",
    { schema: deleteCompanieSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { companie_id } = req.params;

        await deleteCompanie({ companie_id });
        reply.status(204).send();
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
