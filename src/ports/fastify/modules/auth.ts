import {
  authUserSchema,
  logoutUserSchema,
  recoveryPasswordSchema,
  resetPasswordSchema
} from "../schema";
import {
  authUser,
  recoveryPassword,
  resetPassword,
  logoutUser,
} from "@/ports/adapters/http/modules/auth";
import {  LoginType } from "@/core/auth/types";
import { ValidateAuthUser } from "@/helpers/validate-auth-user";
import { ResetPasswordType } from "@/core/user/types";
import { auth } from "../middleware/ensure-authenticated";
import { app } from "../server";
import { handleValidationErrorFastify } from "@/helpers/handle-validation-error-fastify";

export const authRoutes = async () => {
  type LoginRequest = {
    Body: LoginType;
  };
  app.post<LoginRequest>(
    "/login",
    { schema: authUserSchema },
    async (req, reply) => {
      try {
        const { email, password } = req.body;
        const user = await authUser({ email, password });
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
        };

        reply.status(200).send(responseData);
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type RecoveryPasswordRequest = {
    Body: { email: string };
  };
  app.post<RecoveryPasswordRequest>(
    "/recovery-password",
    { schema: recoveryPasswordSchema },
    async (req, reply) => {
      try {
        const { email } = req.body;
        await recoveryPassword({ email });
        reply.status(200).send({ message: "Email send" });
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  type ResetPasswordRequest = {
    Body: ResetPasswordType;
  };
  app.post<ResetPasswordRequest>(
    "/reset-password",
    { schema: resetPasswordSchema },
    async (req, reply) => {
      try {
        const { password, hash_recovery_password, confirm_password } = req.body;
        await resetPassword({
          password,
          hash_recovery_password,
          confirm_password
        });
        reply.status(200).send({ message: "Password changed" });
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );

  app.post(
    "/logout",
    { schema: logoutUserSchema, preValidation: auth() },
    async (req, reply) => {
      try {
        const { id } = req.raw.user;

        await logoutUser({ user_id: id });
        reply.status(200).send({ message: "Logout success" });
      } catch (error) {
        handleValidationErrorFastify(error, reply);
      }
    }
  );
};
