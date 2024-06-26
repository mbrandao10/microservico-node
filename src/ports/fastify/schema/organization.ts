const propertiesOrganization = {
  id: { type: "string" },
  name: { type: "string" },
  contact_in_charge: { 
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" }
    }
  },
  created_at: { type: "string" },
  updated_at: { type: "string" },
  active: { type: "boolean" }
};

export const organizationSchema = {
  description: "Organization endpoint",
  tags: ["Organization"],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      contact_in_charge: { 
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" }
        }
      },
    active: { type: "boolean" }        },
    required: ["name", "contact_in_charge", "active"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        contact_in_charge: { 
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" }
          }
        },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        active: { type: "boolean" }
      }
    }
  }
};

export const findOrganizationByIdSchema = {
  description: "Organization endpoint",
  tags: ["Organization"],
  params: {
    organization_id: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesOrganization
    }
  }
};

export const findAllOrganizationsSchema = {
  description: "Organizations endpoint",
  tags: ["Organization"],
  querystring: {
    page: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: propertiesOrganization
      }
    }
  }
};

export const updateOrganizationSchema = {
  description: "Organization endpoint",
  tags: ["Organization"],
  params: {
    organization_id: { type: "string" }
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      contact_in_charge: { 
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" }
        }
      },
      created_at: { type: "string" },
      updated_at: { type: "string" },
      active: { type: "boolean" }
    }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesOrganization
    }
  }
};

export const deleteOrganizationSchema = {
  description: "Organization endpoint",
  tags: ["Organization"],
  params: {
    organization_id: { type: "string" }
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
