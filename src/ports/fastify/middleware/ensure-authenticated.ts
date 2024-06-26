import { AuthError, ForbiddenError } from "@/helpers/error";
import { findUserById } from "@/ports/adapters/http/modules/user";
import { acessPermission } from "@/ports/adapters/http/modules/auth";
import { JWTPayload, verifyToken } from "@/ports/adapters/jwt";
import {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  RouteGenericInterface
} from "fastify";
import http from "http";

export type CustomRequest = http.IncomingMessage & {
  user: JWTPayload;
};

export function extractToken(authHeader: string = ""): string | null {
  try {
    const [, token] = authHeader.split("Bearer ");

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    return null;
  }
}

export function authMiddleware(authHeader: string = ""): {
  data: JWTPayload;
  token: string;
} | null {
  const token = extractToken(authHeader);

  if (!token) {
    return null;
  }

  const data = verifyToken(token);
  return { data, token };
}

type AuthPreValidation = <T extends RouteGenericInterface>(
  req: FastifyRequest<T, http.Server, CustomRequest>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => void;

export const auth =
  (requiredPermissions?: string[]): AuthPreValidation =>
  async (req, reply, done) => {
    try {
      const accessToken = req.headers.authorization as string;

      if (!accessToken) {
        reply.code(401).send(new AuthError("Authentication failed"));
        done();
        return;
      }

      const result = authMiddleware(accessToken);

      if (!result?.data || result?.data === null) {
        reply.code(401).send(new AuthError("Authentication failed"));
        done();
        return;
      }

      const user = await findUserById({
        user_id: result.data.id,
      });
      if (user instanceof Error) {
        reply.code(401).send(new AuthError("Authentication failed"));
        done();
        return;
      }

      if (!user.active) {
        reply.code(403).send(new ForbiddenError("Permission denied"));
        done();
        return;
      }

      if (!user) {
        reply.code(401).send(new AuthError("Authentication failed"));
        done();
        return;
      }

      if (!requiredPermissions) {
        req.raw.user = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
        };
        return;
      }

      // const userPermissions = result.data.profiles || [];
      // const hasRequiredPermission = checkPermissions(
      //   userPermissions,
      //   requiredPermissions
      // );

      // if (!hasRequiredPermission) {
      //   reply.code(401).send(new AuthError("Permission denied"));
      //   done();
      //   return;
      // }
      const permissions = await acessPermission({
        user_id: result.data.id
      })
      
      req.raw.user = {
        id: result.data.id,
        name: result.data.name,
        email: result.data.email,
        permissions
      };
    } catch (error) {
      reply.code(401).send(new AuthError("Authentication failed"));
      done();
    }
  };

// const checkPermissions = (
//   userPermissions: string[],
//   requiredPermissions: string[]
// ) => {
//   return requiredPermissions
//     .concat("admin")
//     .some((permission) => userPermissions.includes(permission));
// };
