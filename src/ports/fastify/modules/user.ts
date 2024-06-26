import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";
import {
  findUserById,
  registerUser,
  findAllUsers,
  updateUser,
  deleteUser
} from "@/ports/adapters/http/modules/user";
import { CreateUserType, UpdateUserType } from "@/core/user/types";
import { ValidateAuthUser } from "@/helpers/validate-auth-user";
import {
  deleteUserSchema,
  findAllUsersSchema,
  findUserByIdSchema,
  updateUserSchema,
  userSchema
} from "../schema";

import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";

export const userRoutes = async () => {

  type UserRequest = {
    Body: CreateUserType;
    Params: { user_id: string; email?: string };
  };
  app.post<UserRequest>(
    "/users",
    { schema: userSchema },
    async (req, reply) => {
      try {
        const user = await registerUser(req.body);

        const result = await ValidateAuthUser({
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });

        const responseData = {
          id: user.id,
          token: result?.token,
          email: result.email,
          name: result.name,
          document_number: user.document_number,
          created_at: user.created_at,
          updated_at: user.updated_at
        };

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.get<UserRequest>(
    "/users/:user_id",
    {
      schema: findUserByIdSchema,
      preValidation: auth()
    },
    async (req, reply) => {
      try {
        const { user_id } = req.params;

        const payload = {
          user_id: user_id
        };

        const result = await findUserById(payload);

        reply.status(200).send(result);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type FindAllUserRequest = {
    Querystring: {
      page?: string;
      search?: string;
    };
  };

  app.get<FindAllUserRequest>(
    "/users",
    { schema: findAllUsersSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { page, search } = req.query;
        const response = await findAllUsers({
          page,
          search
        });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UpdateUserTypeOmit = Omit<UpdateUserType, "user_id">;
  type UserUpdateRequest = {
    Body: UpdateUserTypeOmit;
    Params: { user_id: string };
  };
  app.patch<UserUpdateRequest>(
    "/users/:user_id",
    { schema: updateUserSchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { user_id } = req.params;
        const body = req.body;

        const response = await updateUser({ user_id, ...body });
        reply.status(200).send(response);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type UserDeleteRequest = {
    Params: { user_id: string };
  };
  app.delete<UserDeleteRequest>(
    "/users/:user_id",
    { schema: deleteUserSchema, preValidation: auth(["admin"]) },
    async (req, reply) => {
      try {
        const { user_id } = req.params;

        await deleteUser({ user_id });
        reply.status(204).send();
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
