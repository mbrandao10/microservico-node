import * as yup from "yup";

export const organizationSchema = yup.object({
  name: yup.string().required('Name is required'),
  contact_in_charge: yup.object().shape({
    name: yup.string().required('contact_in_charge: Name is required'),
    email: yup.string().email().required("contact_in_charge: Email is required"),
    phone: yup.string().required('contact_in_charge: Phone is required'),
  }),
  active: yup.boolean().optional().optional()
});

export type CreateOrganizationType = yup.InferType<typeof organizationSchema>;

export const organizationUpdateSchema = yup.object({
  organization_id: yup.string().required(),
  name: yup.string().required(),
  contact_in_charge: yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required('Phone is required'),
  }),
  active: yup.boolean().optional().optional()
});

export type UpdateOrganizationType = yup.InferType<typeof organizationUpdateSchema>;
