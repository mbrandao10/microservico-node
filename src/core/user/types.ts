import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required(),
  document_number: yup.string().required(),
  group_companies_ids: yup.array().optional(),
  active: yup.boolean().optional().optional()
});

export type CreateUserType = yup.InferType<typeof userSchema>;

export const resetPasswordSchema = yup.object({
  hash_recovery_password: yup.string().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup
    .mixed()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required()
});

export type ResetPasswordType = yup.InferType<typeof resetPasswordSchema>;

export const userUpdateSchema = yup.object({
  user_id: yup.string().required(),
  name: yup.string().optional(),
  document_number: yup.string().optional(),
  group_companies_ids: yup.array().optional(),
  email: yup.string().email().optional(),
  active: yup.boolean().optional().optional()
});

export type UpdateUserType = yup.InferType<typeof userUpdateSchema>;
