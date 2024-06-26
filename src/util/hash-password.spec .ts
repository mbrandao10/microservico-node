import {
  hashPassword,
  validPassword,
  hashRecoveryPassword
} from "./hash-password";

jest.mock("@/config/auth", () => ({
  salt: "testSalt"
}));

describe("Authentication Utils", () => {
  it("hashPassword should hash the provided password", () => {
    const password = "testPassword";
    const hashedPassword = hashPassword(password);

    expect(typeof hashedPassword).toBe("string");
  });

  it("validPassword should hash the provided password", () => {
    const password = "testPassword";
    const hashedPassword = validPassword(password);

    expect(typeof hashedPassword).toBe("string");
  });

  it("hashRecoveryPassword should hash the provided parameter", () => {
    const param = "testParam";
    const hashedParam = hashRecoveryPassword(param);

    expect(typeof hashedParam).toBe("string");
  });
});
