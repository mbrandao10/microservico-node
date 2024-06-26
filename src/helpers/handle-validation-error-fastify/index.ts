import * as yup from "yup";
import {
  ValidationError,
  ConflictError,
  ForbiddenError,
  UnknownError,
  NotFoundError,
  AuthError
} from "../error";

export const handleValidationErrorFastify = (error: any, reply?: any) => {
  if (error instanceof yup.ValidationError) {
    const path = error.path as string;
    reply.status(400).send(new ValidationError(error.message, path));
    return;
  }

  if (error instanceof ValidationError) {
    reply.status(error.code).send(new ValidationError(error.message));
    return;
  }

  if (error instanceof ConflictError) {
    reply.status(error.code).send(new ConflictError(error.message));
    return;
  }

  if (error instanceof ForbiddenError) {
    reply.status(error.code).send(new ForbiddenError(error.message));
    return;
  }

  if (error instanceof NotFoundError) {
    reply.status(error.code).send(new NotFoundError(error.message));
    return;
  }
  if (error instanceof AuthError) {
    reply.status(error.code).send(new AuthError(error.message));
    return;
  }


  reply.status(error.code).send(new UnknownError());
};
