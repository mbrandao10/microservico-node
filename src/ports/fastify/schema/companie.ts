const propertiesCompanie = {
  id: { type: "string" },
  organization_id: { type: "string" },
  company_logo: { type: "string" },
  company_name: { type: "string" },
  trade_name: { type: "string" },
  document_number: { type: "string" },
  address: { type: "string" },
  contact_in_charge: { 
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" }
    }
  },
  services_ids: { type: "array", items: { type: "string" } },
  categories: { type: "string", enum: ["PIZZA", "FAMILY_MEALS", "PREMIUM"] }, 
  created_at: { type: "string" },
  updated_at: { type: "string" },
  active: { type: "boolean" }
};

export const companieSchema = {
  description: "Companie endpoint",
  tags: ["Companie"],
  body: {
    type: "object",
    properties: {
      organization_id: { type: "string" },
      company_logo: { type: "string" },
      company_name: { type: "string" },
      trade_name: { type: "string" },
      document_number: { type: "string" },
      address: { type: "string" },
      contact_in_charge: { 
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" }
        }
      },
      services_ids: { type: "array", items: { type: "string" } },
      categories: { type: "string", enum: ["PIZZA", "FAMILY_MEALS", "PREMIUM"] }, 
      created_at: { type: "string" },
      updated_at: { type: "string" },
      active: { type: "boolean" }
    },
    required: ["organization_id", "company_name", "trade_name", "document_number", "contact_in_charge"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        organization_id: { type: "string" },
        company_logo: { type: "string" },
        company_name: { type: "string" },
        trade_name: { type: "string" },
        document_number: { type: "string" },
        address: { type: "string" },
        contact_in_charge: { 
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" }
          }
        },
        services_ids: { type: "array", items: { type: "string" } },
        categories: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        active: { type: "boolean" }
      }
    }
  }
};

export const findCompanieByIdSchema = {
  description: "Companie endpoint",
  tags: ["Companie"],
  params: {
    companie_id: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesCompanie
    }
  }
};

export const findAllCompaniesSchema = {
  description: "Companie endpoint",
  tags: ["Companie"],
  querystring: {
    page: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: propertiesCompanie
      }
    }
  }
};

export const updateCompanieSchema = {
  description: "Companie endpoint",
  tags: ["Companie"],
  params: {
    companie_id: { type: "string" }
  },
  body: {
    type: "object",
    properties: {
      organization_id: { type: "string" },
      company_logo: { type: "string" },
      company_name: { type: "string" },
      trade_name: { type: "string" },
      document_number: { type: "string" },
      address: { type: "string" },
      contact_in_charge: { 
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" }
        }
      },
      services_ids: { type: "array", items: { type: "string" } },
      categories: { type: "string" },
      created_at: { type: "string" },
      updated_at: { type: "string" },
      active: { type: "boolean" }
    }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesCompanie
    }
  }
};

export const deleteCompanieSchema = {
  description: "Companie endpoint",
  tags: ["Companie"],
  params: {
    companie_id: { type: "string" }
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
