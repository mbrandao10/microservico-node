import * as yup from "yup";

export enum CategoriesType {
  PIZZA = "PIZZA",
  FAMILY_MEALS = "FAMILY_MEALS",
  PREMIUM = "PREMIUM"
}

export const companieSchema = yup.object({
  organization_id: yup.string().required(),
  company_logo: yup.string().optional(),
  company_name: yup.string().required(),
  trade_name: yup.string().required(),
  document_number: yup.string().required(),
  address: yup.string().optional(),
  contact_in_charge: yup.object().shape({
    name: yup.string().required('contact_in_charge: Name is required'),
    email: yup.string().email().required("contact_in_charge: Email is required"),
    phone: yup.string().required('contact_in_charge: Phone is required'),
  }),
  services_ids: yup.array().optional(),
  categories: yup.string().test((originalValue, ctx) => {
    if (originalValue === undefined) {
      return true
    }
    
    if (!(originalValue in CategoriesType)) {
        return ctx.createError({ message: 'Tipo de categoria inválido' })
    }
    return true
  }),
  active: yup.boolean().optional()
});

export type CreateCompanieType = yup.InferType<typeof companieSchema>;

export const companieUpdateSchema = yup.object({
  companie_id: yup.string().required(),
  organization_id: yup.string().required(),
  company_logo: yup.string().optional(),
  company_name: yup.string().required(),
  trade_name: yup.string().required(),
  document_number: yup.string().required(),
  address: yup.string().optional(),
  contact_in_charge: yup.object().shape({
    name: yup.string().required('contact_in_charge: Name is required'),
    email: yup.string().email().required("contact_in_charge: Email is required"),
    phone: yup.string().required('contact_in_charge: Phone is required'),
  }),
  services_ids: yup.array().optional(),
  categories: yup.string().test((originalValue, ctx) => {
    if (originalValue === undefined) {
      return true
    }
    
    if (!(originalValue in CategoriesType)) {
        return ctx.createError({ message: 'Tipo de categoria inválido' })
    }
    return true
  }),
  active: yup.boolean().optional()
});

export type UpdateCompanieType = yup.InferType<typeof companieUpdateSchema>;
