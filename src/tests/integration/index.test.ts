import { db } from "@/ports/prisma/prisma";
import request from "supertest";
import { app } from "../helper/server";
import * as userHelper from "../helper/users";
import * as authHelper from "../helper/auth";

const createUserTest = {
  user1: {
    email: "user1@mail.com",
    name: "user1",
    password: "123456",
    document_number: "1118443"
  },
  user2: {
    email: "user2@mail.com",
    name: "user2",
    password: "123456",
    document_number: "1118442"
  },
  user3: {
    email: "user3@mail.com",
    name: "user2",
    password: "123456",
    document_number: "1118441"
  }
};

let user1 = {} as any;
let user2 = {} as any;
let user3 = {} as any;

beforeAll(async () => {
  const users = db.users.deleteMany();

  await db.$transaction([users]);

  const PromiseUsers = Object.values(createUserTest).map(async (value) => {
    return await userHelper.resgisterUser(app, {
      email: value.email,
      password: value.password,
      name: value.name,
      document_number: value.document_number
    } as any);
  });

  [user1, user2, user3] = await Promise.all(PromiseUsers);
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
    expect(user1.status).toBe(200);
    expect(user2.status).toBe(200);
    expect(user3.status).toBe(200);
  });
});
describe("Auth E-mail", () => {
  it("Shold error registe user has exitis", async () => {
    const result = await userHelper.resgisterUser(app, {
      email: "user3@mail.com",
      name: "user2",
      password: "123456",
      document_number: "1118441"
    });

    expect(result.statusCode).toBe(409);
  });

  it("Shold return error when try auth user not exists", async () => {
    const result = await authHelper.authEmail(app, {
      email: "test",
      password: "testest"
    });
    expect(result.body).toHaveProperty("error");
  });

  it("Shold return error when try auth user with password invalid", async () => {
    const result = await authHelper.authEmail(app, {
      email: "user3@mail.com",
      password: "12345899"
    });

    expect(result.body).toHaveProperty("error");
  });
});

describe("Recovery Password", () => {
  it("Shold send email recovery password", async () => {
    const result = await authHelper.recoveryPassword(app, {
      email: "user3@mail.com"
    });

    expect(result.status).toBe(200);
  });

  it("Shold return error when try send email recovery password with email not exists", async () => {
    const result = await authHelper.recoveryPassword(app, {
      email: "test@test.com"
    });

    expect(result.body).toHaveProperty("error");
  });

  it("Shold return error when try reset password with link invalid", async () => {
    const result = await authHelper.resetPassword(app, {
      hash_recovery_password: "test",
      password: "12345689",
      confirm_password: "12345689"
    });

    expect(result.body).toHaveProperty("error");
  });
});

describe("User", () => {
  it("Shold return error when try registe password invalid", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        name: "User davi",
        password: "123",
        email: "invalid@invalid",
        document_number: "1118441"
      })
      .set("Content-Type", "application/json")
      .expect(400);

    expect(result.body).toHaveProperty("error");
    expect(result.body).toHaveProperty("code");
    expect(result.body).toHaveProperty("message");
  });

  it("Shold return error email duplication", async () => {
    const result = await userHelper.resgisterUser(app, {
      name: "User davi",
      password: "123456",
      email: "user@gmail.com",
      document_number: "1118441"
    });

    expect(result.status).toBe(200);

    const result2 = await userHelper.resgisterUser(app, {
      name: "User davi",
      password: "123456",
      email: "user@gmail.com",
      document_number: "1118441"
    });
    expect(result2.status).toBe(409);
  });

  it("Shold return error when try find all users without token", async () => {
    const result = await userHelper.findAllUsers(app, {
      token: ""
    });

    expect(result.body).toHaveProperty("error");
    expect(result.status).toBe(401);
  });

  it("Shold return user by id", async () => {
    const authUser = await authHelper.authEmail(app, {
      email: "user@gmail.com",
      password: "123456"
    });
    expect(authUser.status).toBe(200);

    const userByEmail = await userHelper.findUserById(app, {
      user_id: user1.body.id,
      token: authUser.body.token
    });
    expect(userByEmail.status).toBe(200);

    const result = await userHelper.findUserById(app, {
      user_id: userByEmail.body.id,
      token: authUser.body.token
    });
    expect(result.status).toBe(200);

    expect(result.body).toHaveProperty("id");
  });

  it("Shold return error when try inactivate user not exists", async () => {
    const authUser = await authHelper.authEmail(app, {
      email: "user@gmail.com",
      password: "123456"
    });

    const result = await userHelper.deleteUserById(app, {
      user_id: "usernotexiter@mail.com",
      token: authUser.body.token
    });

    expect(result.status).toBe(400);
  });
});
