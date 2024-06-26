import { db } from "@/ports/prisma/prisma";
import request from "supertest";
import { app } from "../helper/server";
import * as serviceHelper from "../helper/service";
import * as authHelper from "../helper/auth";
import { ServicesType } from "@/core/service/types";
import { CategoriesType } from "@/core/companie/types";


const createCompanieTest = {
  groupCompanie1: {
    organization_id: "",
    company_logo: "asdasdas",
    company_name: "Company 1",
    trade_name: "User",
    document_number: "12345678946",
    address: "Rua 1",
    contact_in_charge: {
      name: "Company 1",
      email: "service1@company.com",
      phone: "123456789",
    },
    services_ids: [],
    categories: CategoriesType.PIZZA,
  }
};

const createServiceTest = {
  groupService1: {
    company_id: "",
    name: "Service 1",
    type: ServicesType.TOTEM,
    availability: [
      {
        day_of_week: 'MONDAY',
        time_periods: [
          { start_time: '09:00', end_time: '12:00' },
          { start_time: '14:00', end_time: '18:00' },
        ],
      },
      {
        day_of_week: 'TUESDAY',
        time_periods: [
          { start_time: '10:00', end_time: '13:00' },
          { start_time: '15:00', end_time: '19:00' },
        ],
      },
    ],
    active: false,
  }
};

let service1 = {} as any;
let org = {} as any;
let authUser = {} as any;
let serviceRequest = {} as any;

beforeAll(async () => {
  const groupCompanie = db.companies.deleteMany();
  const services = db.services.deleteMany();

  await db.$transaction([groupCompanie, services]);

  org = await db.companies.create({
    data: createCompanieTest.groupCompanie1
  })

  const { body } = await authHelper.authEmail(app, {
    email: "user@mail.com",
    password: "123456"
  });

  authUser = body;

  const PromiseService = Object.values(createServiceTest).map(async (value) => {
    return await serviceHelper.resgisterService(app, {
      token: authUser.token,
      company: {
        company_id: org.id,
        name: value.name,
        type: value.type,
        availability: value.availability,
        active: value.active,
      }
    } as any);
  });

  [serviceRequest] = await Promise.all(PromiseService);
  service1 = serviceRequest.body;
  
});

afterAll(async () => {
  if (app) {
    await app.close();
  }
});
  
describe("Status of server", () => {
  it("Shold return status 200", async () => {
    await request(app).head("/").expect(200);
  });
});

describe("Test all client", () => {
  it("Shold return status 200", async () => {
    expect(serviceRequest.status).toBe(200);
  });
});


describe("Group Company", () => {
  it("Shold return error when try registe without company_id", async () => {
    const result = await request(app)
      .post("/service")
      .send({
        company_id: "",
        name: "Service 1",
        type: ServicesType.TOTEM,
        availability: [
          {
            day_of_week: 'MONDAY',
            time_periods: [
              { start_time: '09:00', end_time: '12:00' },
              { start_time: '14:00', end_time: '18:00' },
            ],
          },
          {
            day_of_week: 'TUESDAY',
            time_periods: [
              { start_time: '10:00', end_time: '13:00' },
              { start_time: '15:00', end_time: '19:00' },
            ],
          },
        ],
        active: false,
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${authUser.token}`)
      .expect(400);

    expect(result.body).toHaveProperty("error");
    expect(result.body).toHaveProperty("code");
    expect(result.body).toHaveProperty("message");
  });

  it("Shold return error when type not exist", async () => {
    const result2 = await serviceHelper.resgisterService(app, {
      token: authUser.token,
      service: {
        company_id: "",
        name: "Service 1",
        type: "qualquer",
        availability: [
          {
            day_of_week: 'MONDAY',
            time_periods: [
              { start_time: '09:00', end_time: '12:00' },
              { start_time: '14:00', end_time: '18:00' },
            ],
          },
          {
            day_of_week: 'TUESDAY',
            time_periods: [
              { start_time: '10:00', end_time: '13:00' },
              { start_time: '15:00', end_time: '19:00' },
            ],
          },
        ],
        active: false,
      }
    });
    expect(result2.status).toBe(400);
    expect(result2.body.message).toBe("body/type must be equal to one of the allowed values");
  });


  it("Shold save service", async () => {
    const result3 = await serviceHelper.resgisterService(app, {
      token: authUser.token,
      service: {
        company_id: "",
        name: "Service 1",
        type: ServicesType.TOTEM,
        availability: [
          {
            day_of_week: 'MONDAY',
            time_periods: [
              { start_time: '09:00', end_time: '12:00' },
              { start_time: '14:00', end_time: '18:00' },
            ],
          },
          {
            day_of_week: 'TUESDAY',
            time_periods: [
              { start_time: '10:00', end_time: '13:00' },
              { start_time: '15:00', end_time: '19:00' },
            ],
          },
        ],
        active: false,
      }
    });
    expect(result3.status).toBe(200);
  });


  it("Shold return service by id", async () => {
    const result = await serviceHelper.findServiceById(app, {
      service_id: service1.id,
      token: authUser.token
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
  });

  it("Shold update service", async () => {
    const result4 = await serviceHelper.updateServiceById(app, {
      token: authUser.token,
      service_id: service1.id,
      data: {
        company_id: "",
        service_id: "",
        name: "Service 1",
        type: "TOTEM",
        availability: [
          {
            day_of_week: 'MONDAY',
            time_periods: [
              { start_time: '09:00', end_time: '12:00' },
              { start_time: '14:00', end_time: '18:00' },
            ],
          },
          {
            day_of_week: 'TUESDAY',
            time_periods: [
              { start_time: '10:00', end_time: '13:00' },
              { start_time: '15:00', end_time: '19:00' },
            ],
          },
        ],
        active: false,
      }
    });

    expect(result4.status).toBe(200);
    expect(result4.body.name).toBe("Service Update");
  });

  it("Shold delete service", async () => {
    
    const result5 = await serviceHelper.deleteServiceById(app, {
      token: authUser.token,
      service_id: service1.id,
    });
    expect(result5.status).toBe(204);
  });

});
