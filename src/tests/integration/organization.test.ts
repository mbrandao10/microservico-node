import { db } from "@/ports/prisma/prisma";
import request from "supertest";
import { app } from "../helper/server";
import * as organizationHelper from "../helper/organization";
import * as authHelper from "../helper/auth";

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

let organization = {} as any;
let authUser = {} as any;

beforeAll(async () => {
  const organizationDelete = db.organizations.deleteMany();

  await db.$transaction([organizationDelete]);

  const { body } = await authHelper.authEmail(app, {
    email: "user@mail.com",
    password: "123456"
  });

  authUser = body;

  organization = await db.organizations.create({
    data: createOrganizationTest.groupOrganization1
  })
});

afterAll(async () => {
  if (app) {
    await app.close();
  }
});


describe("Organization", () => {
  it("Shold return error when try registe without name", async () => {
    const result = await request(app)
      .post("/organizations")
      .send({
        contact_in_charge: {
          name: "Organization 1",
          email: "org@org.com",
          phone: "123456789",
        },
        active: true
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${authUser.token}`)
      .expect(400);

    expect(result.body).toHaveProperty("error");
    expect(result.body).toHaveProperty("code");
    expect(result.body).toHaveProperty("message");
  });

  it("Shold return error when contact_in_charge.Email is empty", async () => {
    const result2 = await organizationHelper.resgisterOrganization(app, {
      token: authUser.token,
      organization: {
        name: "Organization 1",
        contact_in_charge: {
          name: "Company 1",
          email: "",
          phone: "123456789",
        },
        active: true
      }
    });
    
    expect(result2.status).toBe(400);
    expect(result2.body.message).toBe("contact_in_charge: Email is required");
  });

  it("Shold save organization", async () => {
    const result3 = await organizationHelper.resgisterOrganization(app, {
      token: authUser.token,
      organization: {
        name: "Organization 1",
        contact_in_charge: {
          name: "Company 1",
          email: "comp@comp.com",
          phone: "123456789",
        },
        active: true  
      }
    });
    expect(result3.status).toBe(200);
  });

  it("Shold return organization by id", async () => {
    const result = await organizationHelper.findOrganizationById(app, {
      organization_id: organization.id,
      token: authUser.token
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
  });

  it("Shold update organization", async () => {
    const result4 = await organizationHelper.updateOrganizationById(app, {
      token: authUser.token,
      organization_id: organization.id,
      data: {
        organization_id: organization.id,
        name: "Organization Update",
        contact_in_charge: {
          name: "Company 1",
          email: "comp@comp.com",
          phone: "123456789",
        },
        active: true
      }
    });
    expect(result4.status).toBe(200);
    expect(result4.body.name).toBe("Organization Update");
  });

  it("Shold delete organization", async () => {
    const result5 = await organizationHelper.deleteOrganizationById(app, {
      token: authUser.token,
      organization_id: organization.id,
    });
    expect(result5.status).toBe(204);
  });

});
