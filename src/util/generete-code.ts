import crypto from "crypto";

export const generateCode = (length?: number) => {
  const size = length ?? 4;
  const hash = crypto.randomBytes(size / 2).toString("hex");

  return hash;
};
