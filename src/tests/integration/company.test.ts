import { db } from "@/ports/prisma/prisma";
import request from "supertest";
import { app } from "../helper/server";
import * as companyHelper from "../helper/company";
import * as authHelper from "../helper/auth";
import { CategoriesType } from "@/core/companie/types";

const createOrganizationTest = {
  groupOrganization1: {
    name: "Organization 1",
    contact_in_charge: {
      name: "Organization 1",
      email: "org@org.com",
      phone: "123456789",
    },
    active: true
  }
};

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
      email: "company1@company.com",
      phone: "123456789",
    },
    services_ids: [],
    categories: CategoriesType.PIZZA,
  }
};

let company1 = {} as any;
let org = {} as any;
let authUser = {} as any;
let companyRequest = {} as any;

beforeAll(async () => {
  // await fastify.ready();
  const groupOrganization = db.organizations.deleteMany();
  const companies = db.companies.deleteMany();

  await db.$transaction([groupOrganization, companies]);

  org = await db.organizations.create({
    data: createOrganizationTest.groupOrganization1
  })

  const { body } = await authHelper.authEmail(app, {
    email: "user@mail.com",
    password: "123456"
  });

  authUser = body;

  const PromiseCompany = Object.values(createCompanieTest).map(async (value) => {
    return await companyHelper.resgisterCompany(app, {
      token: authUser.token,
      company: {
        organization_id: org.id,
        company_logo: value.company_logo,
        company_name: value.company_name,
        trade_name: value.trade_name,
        document_number: value.document_number,
        address: value.address,
        contact_in_charge: value.contact_in_charge,
        services_ids: value.services_ids,
        categories: value.categories,
      }
    } as any);
  });

  [companyRequest] = await Promise.all(PromiseCompany);
  company1 = companyRequest.body;
  
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
    expect(companyRequest.status).toBe(200);
  });
});


describe("Group Company", () => {
  it("Shold return error when try registe without organization_id", async () => {
    const result = await request(app)
      .post("/companies")
      .send({
        organization_id: "",
        company_logo: "asdasdas",
        company_name: "Company 1",
        trade_name: "User",
        document_number: "12345678946",
        address: "Rua 1",
        contact_in_charge: {
          name: "Company 1",
          email: "company1@company.com",
          phone: "123456789",
        },
        services_ids: [],
        categories: CategoriesType.PIZZA,
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${authUser.token}`)
      .expect(400);

    expect(result.body).toHaveProperty("error");
    expect(result.body).toHaveProperty("code");
    expect(result.body).toHaveProperty("message");
  });

  it("Shold return error when categories not exist", async () => {
    const result2 = await companyHelper.resgisterCompany(app, {
      token: authUser.token,
      company: {
        organization_id: org.id,
        company_logo: "asdasdas",
        company_name: "Company 1",
        trade_name: "User",
        document_number: "12345678946",
        address: "Rua 1",
        contact_in_charge: {
          name: "Company 1",
          email: "company1@company.com",
          phone: "123456789",
        },
        services_ids: [],
        categories: "Qualquer",
      }
    });
    expect(result2.status).toBe(400);
    expect(result2.body.message).toBe("body/categories must be equal to one of the allowed values");
  });


  it("Shold save company", async () => {
    const result3 = await companyHelper.resgisterCompany(app, {
      token: authUser.token,
      company: {
        organization_id: org.id,
        company_logo: "asdasdas",
        company_name: "Company 1",
        trade_name: "User",
        document_number: "12345678946",
        address: "Rua 1",
        contact_in_charge: {
          name: "Company 1",
          email: "company1@company.com",
          phone: "123456789",
        },
        services_ids: [],
        categories: "PIZZA",
      }
    });
    expect(result3.status).toBe(200);
  });


  it("Shold return company by id", async () => {
    const result = await companyHelper.findCompanyById(app, {
      company_id: company1.id,
      token: authUser.token
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
  });

  it("Shold update company", async () => {
    const result4 = await companyHelper.updateCompanyById(app, {
      token: authUser.token,
      companie_id: company1.id,
      data: {
        companie_id: company1.id,
        organization_id: org.id,
        company_logo: "asdasdas",
        company_name: "Company Update",
        trade_name: "User",
        document_number: "12345678946",
        address: "Rua 1",
        contact_in_charge: {
          name: "Company 1",
          email: "company1@company.com",
          phone: "123456789",
        },
        services_ids: [],
        categories: "PIZZA",
      }
    });

    expect(result4.status).toBe(200);
    expect(result4.body.company_name).toBe("Company Update");
  });

  it("Shold delete company", async () => {
    
    const result5 = await companyHelper.deleteCompanyById(app, {
      token: authUser.token,
      company_id: company1.id,
    });
    expect(result5.status).toBe(204);
  });

});
