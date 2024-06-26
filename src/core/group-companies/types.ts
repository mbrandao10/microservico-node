import * as yup from "yup";

export const groupCompanySchema = yup.object({
  name: yup.string().required(),
  organization_id: yup.string().required(),
  default: yup.boolean().required(),
  company_ids: yup.array().test({
    name: 'company_ids_required',
    test: function (value) {
      const isDefaultFalse = this.parent.default === false;

      if (isDefaultFalse && (!value || value.length === 0)) {
        throw this.createError({
          path: 'company_ids',
          message: 'Company IDs is required when default is false'
        });
      }

      return true;
    }
  }),
  active: yup.boolean().optional().optional()
});

export type CreateGroupCompanyType = yup.InferType<typeof groupCompanySchema>;

export const groupCompanyUpdateSchema = yup.object({
  group_company_id: yup.string().required(),
  name: yup.string().required(),
  organization_id: yup.string().required(),
  default: yup.boolean().required(),
  company_ids: yup.array().test({
    name: 'company_ids_required',
    test: function (value) {
      const isDefaultFalse = this.parent.default === false;

      if (isDefaultFalse && (!value || value.length === 0)) {
        throw this.createError({
          path: 'company_ids',
          message: 'Company IDs is required when default is false'
        });
      }

      return true;
    }
  }),
  active: yup.boolean().optional().optional()
});

export type UpdateGroupCompanyType = yup.InferType<typeof groupCompanyUpdateSchema>;
