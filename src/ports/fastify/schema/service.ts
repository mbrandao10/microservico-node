const propertiesService = {
  id: { type: "string" },
  company_id: { type: "string" },
  name: { type: "string" },
  type: { type: "string", enum: ["TOTEM"] },
  availability: {
    type: "array",
    items: {
      type: "object",
      properties: {
        day_of_week: { type: "string", enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
        time_periods: {
          type: "array",
          items: {
            type: "object",
            properties: {
              start_time: { type: "string" },
              end_time: { type: "string" }
            }
          }
        }
      }
    }
  },
  created_at: { type: "string" },
  updated_at: { type: "string" },
  active: { type: "boolean" }
};

export const serviceSchema = {
  description: "service endpoint",
  tags: ["Service"],
  body: {
    type: "object",
    properties: {
      company_id: { type: "string" },
      name: { type: "string" },
      type: { type: "string", enum: ["TOTEM"] },
      availability: {
        type: "array",
        items: {
          type: "object",
          properties: {
            day_of_week: { type: "string", enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
            time_periods: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start_time: { type: "string" },
                  end_time: { type: "string" }
                }
              }
            }
          }
        }
      },
      active: { type: "boolean" }
    },
    required: ["company_id", "name", "type", "availability", "active"]
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        company_id: { type: "string" },
        name: { type: "string" },
        type: { type: "string", enum: ["TOTEM"] },
        availability: {
          type: "array",
          items: {
            type: "object",
            properties: {
              day_of_week: { type: "string", enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
              time_periods: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    start_time: { type: "string" },
                    end_time: { type: "string" }
                  }
                }
              }
            }
          }
        },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        active: { type: "boolean" }
      }
    }
  }
};

export const findServiceByIdSchema = {
  description: "service endpoint",
  tags: ["Service"],
  params: {
    service_id: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesService
    }
  }
};

export const findAllServiceSchema = {
  description: "Service endpoint",
  tags: ["Service"],
  querystring: {
    page: { type: "string" }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: propertiesService
      }
    }
  }
};

export const updateServiceSchema = {
  description: "Service endpoint",
  tags: ["Service"],
  params: {
    service_id: { type: "string" }
  },
  body: {
    type: "object",
    properties: {
      company_id: { type: "string" },
      name: { type: "string" },
      type: { type: "string", enum: ["TOTEM"] },
      availability: {
        type: "array",
        items: {
          type: "object",
          properties: {
            day_of_week: { type: "string", enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"] },
            time_periods: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start_time: { type: "string" },
                  end_time: { type: "string" }
                }
              }
            }
          }
        }
      },
      active: { type: "boolean" }
    }
  },
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: propertiesService
    }
  }
};

export const deleteServiceSchema = {
  description: "Service endpoint",
  tags: ["Service"],
  params: {
    service_id: { type: "string" }
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
