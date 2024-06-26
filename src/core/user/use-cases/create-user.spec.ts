import { CreateUserType } from "../types";
import { OutsideRegisterUser, registerUser } from "./register-user";
import * as yup from "yup";

const mockUser: CreateUserType = {
  name: "Maria",
  email: "maria@mail.com",
  password: "123456",
  document_number: "123456789",
  group_companies_ids: ["123", "456"],
};

const createUserOk: OutsideRegisterUser<CreateUserType> = async (data: CreateUserType) => {
  return data;
};

const createUserError: OutsideRegisterUser<never> = async () => {
  throw new Error("Error creating user");
};

it("should create a user", async () => {
  const user = await registerUser(createUserOk)(mockUser);
  expect(user).toEqual(mockUser);
});

it("should throw an error", async () => {
  try {
    await registerUser(createUserError)(mockUser);
  } catch (error) {
    expect(error).toEqual(new Error("Error creating user"));
  }
});

it("should validate user email", async () => {
  const invalidUser = { ...mockUser, email: "invalidemail" };
  try {
    await registerUser(createUserOk)(invalidUser);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      expect(error.message).toEqual("email must be a valid email");
      expect(error.path).toEqual("email");
    }
  }
});

it("should validate user document", async () => {
  const invalidUser = { ...mockUser, document: undefined } as any;
  try {
    await registerUser(createUserOk)(invalidUser);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      expect(error.path).toEqual("document");
    }
  }
});

it("should check for existing user", async () => {
  const existingUser = { ...mockUser, email: "existing@mail.com" };
  const checkExistingUser: OutsideRegisterUser<CreateUserType> = async (
    data: CreateUserType
  ) => {
    if (data.email === "existing@mail.com") {
      throw new Error("User already exists");
    }
    return data;
  };

  try {
    await registerUser(checkExistingUser)(existingUser);
  } catch (error) {
    expect(error).toEqual(new Error("User already exists"));
  }
});

it("should validate user password", async () => {
  const invalidUser = { ...mockUser, password: "inv" };
  try {
    await registerUser(createUserOk)(invalidUser);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      expect(error.path).toEqual("password");
    }
  }
});
