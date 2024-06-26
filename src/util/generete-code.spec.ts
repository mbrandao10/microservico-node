import { generateCode } from "@/util/generete-code";

describe("generateCode", () => {
  it("generateCode should generate a random code of the specified length", () => {
    const length = 8;
    const code = generateCode(length);

    expect(typeof code).toBe("string");

    expect(code.length).toBe(length);

    const regex = /^[0-9a-fA-F]+$/;
    expect(regex.test(code)).toBe(true);
  });

  it("generateCode should generate a code with a default length of 4", () => {
    const code = generateCode();

    expect(typeof code).toBe("string");

    expect(code.length).toBe(4);

    const regex = /^[0-9a-fA-F]+$/;
    expect(regex.test(code)).toBe(true);
  });
});
