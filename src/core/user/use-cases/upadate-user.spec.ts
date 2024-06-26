import * as yup from "yup";
import { OutsideUpdateUser, updateUser } from "./update-user";
import { UpdateUserType } from "../types";

const mock = {
  user_id: "65385d2e178a7ee1518a8f4b",
  name: "Davi",
  document_number: "15985"
} as UpdateUserType;

const updateUserOk: OutsideUpdateUser<UpdateUserType> = async (
  data: UpdateUserType
) => {
  return data;
};

const updateUserError: OutsideUpdateUser<never> = async () => {
  throw new Error("Error upadate user");
};

describe("Users updated", () => {
  it("should change a Users", async () => {
    const user = await updateUser(updateUserOk)(mock);
    expect(user).toEqual(mock);
  });

  it("should throw an error", async () => {
    try {
      await updateUser(updateUserError)(mock);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toEqual(new Error("Error upadate user"));
    }
  });

  it("should throw an error when user_id is not provided", async () => {
    try {
      await updateUser(updateUserOk)({
        ...mock,
        user_id: ""
      });
      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        expect(error.path).toEqual("user_id");
      }
    }
  });
});
