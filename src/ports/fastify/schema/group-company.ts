const propertiesGroupCompany = {
  id: { type: "string" },
  name: { type: "string" },
  organization_id: { type: "string" },
  company_ids: { type: "array", items: { type: "string" } },
  default: { type: "boolean" },
  created_at: { type: "string" },
  updated_at: { type: "string" },
  active: { type: "boolean" }
};

export const groupCompanySchema = {
  description: "GroupCompany endpoint",
  tags: ["GroupCompany"],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      organization_id: { type: "string" },
      company_ids: { type: "array", items: { type: "string" } },
      default: { type: "boolean" },
      active: { type: "boolean" }
    },
    required: ["name", "organization_id", "default", "active"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        organization_id: { type: "string" },
        company_ids: { type: "array", items: { type: "string" } },
        default: { type: "boolean" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        active: { type: "boolean" }
      }
    }
  }
};

export const findGroupCompanyByIdSchema = {
  description: "GroupCompany endpoint",
  tags: ["GroupCompany"],
  params: {
    group_company_id: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesGroupCompany
    }
  }
};

export const findAllGroupCompanySchema = {
  description: "GroupCompany endpoint",
  tags: ["GroupCompany"],
  querystring: {
    page: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: propertiesGroupCompany
      }
    }
  }
};

export const updateGroupCompanySchema = {
  description: "GroupCompany endpoint",
  tags: ["GroupCompany"],
  params: {
    group_company_id: { type: "string" }
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      organization_id: { type: "string" },
      company_ids: { type: "array", items: { type: "string" } },
      default: { type: "boolean" },
      active: { type: "boolean" }
    }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesGroupCompany
    }
  }
};

export const deleteGroupCompanySchema = {
  description: "GroupCompany endpoint",
  tags: ["GroupCompany"],
  params: {
    group_company_id: { type: "string" }
  },
  response: {
    204: {
      description: "Succesful response",
      type: "object",
      properties: {
        message: { type: "string" }
      }
    }
  }
};
