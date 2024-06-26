const propertiesUser = {
  id: { type: "string" },
  token: { type: "string" },
  email: { type: "string" },
  name: { type: "string" },
  document_number: { type: "string" },
  group_companies_ids: { type: "array", items: { type: "string" } },
  created_at: { type: "string" },
  updated_at: { type: "string" },
  active: { type: "boolean" }
};

export const userSchema = {
  description: "Users endpoint",
  tags: ["User"],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      document_number: { type: "string" },
      group_companies_ids: { type: "array", items: { type: "string" } },
      password: { type: "string" },
      active: { type: "boolean" }
    },
    required: ["name", "email", "password", "document_number"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        token: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        document_number: { type: "string" },
        group_companies_ids: { type: "array", items: { type: "string" } },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    }
  }
};

export const findUserByIdSchema = {
  description: "Users endpoint",
  tags: ["User"],
  params: {
    user_id: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesUser
    }
  }
};

export const findAllUsersSchema = {
  description: "Users endpoint",
  tags: ["User"],
  querystring: {
    page: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: propertiesUser
      }
    }
  }
};

export const updateUserSchema = {
  description: "Users endpoint",
  tags: ["User"],
  params: {
    user_id: { type: "string" }
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      // description: { type: "string" },
      active: { type: "boolean" },
      document_number: { type: "string" },
      group_companies_ids: { type: "array", items: { type: "string" } }
    }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesUser
    }
  }
};

export const authUserSchema = {
  description: "Auth endpoint",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" }
    },
    required: ["email", "password"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        token: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        document_number: { type: "string" },
        group_companies_ids: { type: "array", items: { type: "string" } },
        created_at: { type: "string" },
        updated_at: { type: "string" }
      }
    }
  }
};

export const recoveryPasswordSchema = {
  description: "Auth endpoint",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      email: { type: "string" }
    }
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        message: { type: "string" }
      }
    }
  },
  401: {
    description: "Unauthorized response",
    type: "object",
    properties: {
      message: { type: "string" }
    }
  },
  404: {
    description: "Not user found response",
    type: "object",
    properties: {
      message: { type: "string" }
    }
  }
};

export const resetPasswordSchema = {
  description: "Auth endpoint",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      hash_recovery_password: { type: "string" },
      password: { type: "string" },
      confirm_password: { type: "string" }
    }
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        message: { type: "string" }
      }
    }
  },
  401: {
    description: "Unauthorized response",
    type: "object",
    properties: {
      message: { type: "string" }
    }
  },
  404: {
    description: "Not user found response",
    type: "object",
    properties: {
      message: { type: "string" }
    }
  }
};

export const deleteUserSchema = {
  description: "Users endpoint",
  tags: ["User"],
  params: {
    user_id: { type: "string" }
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

export const logoutUserSchema = {
  description: "Auth endpoint",
  tags: ["Auth"],
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        message: { type: "string" }
      }
    }
  }
};
