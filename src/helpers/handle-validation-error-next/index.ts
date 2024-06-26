import * as yup from "yup";
import { NextFunction } from "express";
import { ValidationError } from "../error";

export const handleValidationError = (error: any, next: NextFunction) => {
  if (error instanceof yup.ValidationError) {
    const path = error.path as string;
    return next(new ValidationError(error.message, path));
  }
  next(error);
};
