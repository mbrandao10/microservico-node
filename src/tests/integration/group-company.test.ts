import { db } from "@/ports/prisma/prisma";
import request from "supertest";
import { app } from "../helper/server";
import * as groupCompanyHelper from "../helper/group-company";
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
  },
  groupCompanie2: {
    organization_id: "",
    company_logo: "asdasdas",
    company_name: "Company 2",
    trade_name: "User",
    document_number: "123458946",
    address: "Rua 3",
    contact_in_charge: {
      name: "Company 2",
      email: "company2@company.com",
      phone: "123456781",
    },
    services_ids: [],
    categories: CategoriesType.FAMILY_MEALS,
  }
};

const createGroupCompanyTest = {
  groupGroupCompany1: {
    name: "Group Company 1",
    organization_id: "asdasdasdasdas",
    default: true,
    company_ids: [],
    active: true,
  },
  groupGroupCompany2: {
    name: "Group Company 2",
    organization_id: "asdasdasdasdas",
    default: false,
    company_ids: [],
    active: true,
  },
};

let groupCompany1 = {} as any;
let groupCompany2 = {} as any;
let company1 = {} as any;
let org = {} as any;
let authUser = {} as any;

beforeAll(async () => {
  const groupOrganization = db.organizations.deleteMany();
  const companies = db.companies.deleteMany();
  const groupCompanies = db.groupCompanies.deleteMany();

  await db.$transaction([groupOrganization, companies, groupCompanies]);

  org = await db.organizations.create({
    data: createOrganizationTest.groupOrganization1
  })

  const PromiseCompany = Object.values(createCompanieTest).map(async (value) => {
    return await db.companies.create({
      data: {
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
    })
  });

  const userLogged = await authHelper.authEmail(app, {
    email: "user@mail.com",
    password: "123456"
  });

  authUser = userLogged.body;

  [company1] = await Promise.all(PromiseCompany);

  const PromiseGroupCompany = Object.values(createGroupCompanyTest).map(async (value) => {
    return await groupCompanyHelper.resgisterGroupCompany(app, {
      token: authUser.token,
      group_company: {
        name: value.name,
        organization_id: org.id,
        default: value.default,
        company_ids: [company1.id],
        active: value.active,
      }
    } as any);
  });

  let groupCompany1Request = {} as any;
  let groupCompany2Request = {} as any;

  [groupCompany1Request, groupCompany2Request] = await Promise.all(PromiseGroupCompany);  
  groupCompany1 = groupCompany1Request.body;
  groupCompany2 = groupCompany2Request.body;  
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
    expect(groupCompany1).toHaveProperty("id");
    expect(groupCompany2).toHaveProperty("id");
  });
});


describe("Group Company", () => {
  it("Shold return error when try registe without organization_id", async () => {
    const result = await request(app)
      .post("/group-company")
      .send({
        name: "Group Company 1",
        default: true,
        company_ids: [],
        active: true,
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${authUser.token}`)
      .expect(400);

    expect(result.body).toHaveProperty("error");
    expect(result.body).toHaveProperty("code");
    expect(result.body).toHaveProperty("message");
  });

  it("Shold return error when default is false and company_ids is empty", async () => {
    const result2 = await groupCompanyHelper.resgisterGroupCompany(app, {
      token: authUser.token,
      group_company: {
        name: "Group Test",
        organization_id: org.id,
        default: false,
        company_ids: [],
        active: true,  
      }
    });
    expect(result2.status).toBe(400);
    expect(result2.body.message).toBe("Company IDs is required when default is false");
  });


  it("Shold return error when organization not exist", async () => {
    const result2 = await groupCompanyHelper.resgisterGroupCompany(app, {
      token: authUser.token,
      group_company: {
        name: "Group Test",
        organization_id: "123123123123123131",
        default: false,
        company_ids: [company1.id],
        active: true,  
      }
    });
    expect(result2.status).toBe(418);
  });

  it("Shold save group company", async () => {
    const result3 = await groupCompanyHelper.resgisterGroupCompany(app, {
      token: authUser.token,
      group_company: {
        name: "Group Test",
        organization_id: org.id,
        default: false,
        company_ids: [company1.id],
        active: true,
      }
    });
    expect(result3.status).toBe(200);
  });

  it("Shold update group company", async () => {
    const resultUpdate = await groupCompanyHelper.updateGroupCompanyById(app, {
      token: authUser.token,
      group_company_id: groupCompany1.id,
      data: {
        group_company_id: groupCompany1.id,
        name: "Group Company Update",
        organization_id: org.id,
        default: false,
        company_ids: [company1.id],
        active: true,
      }
    });
    expect(resultUpdate.status).toBe(200);
    expect(resultUpdate.body.name).toEqual("Group Company Update");
  });


  it("Shold return group company by id", async () => {
    const resultGetById = await groupCompanyHelper.findGroupCompanyById(app, {
        group_company_id: groupCompany1.id,
        token: authUser.token
    });
    
    expect(resultGetById.status).toBe(200);
    expect(resultGetById.body).toHaveProperty("id");
  });

  it("Shold return all group company", async () => {
    const resultAll = await groupCompanyHelper.findAllGroupCompanies(app, {
        token: authUser.token
    });
    
    expect(resultAll.status).toBe(200);
    expect(resultAll.body[0]).toHaveProperty("id");
});


  it("Shold delete group ccompany", async () => {
    const result5 = await groupCompanyHelper.deleteUGroupCompanyById(app, {
      token: authUser.token,
      group_company_id: groupCompany1.id,
    });
    expect(result5.status).toBe(204);
  });

});
