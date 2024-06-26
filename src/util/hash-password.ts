import crypto from "crypto";
import authConfig from "@/config/auth";

export const hashPassword = (password: string): string => {
  const { salt } = authConfig;

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
};

export const validPassword = (password: string): string => {
  const { salt } = authConfig;

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
};

export const hashRecoveryPassword = (param: string): string => {
  const { salt } = authConfig;

  const hash = crypto
    .pbkdf2Sync(param, salt, 1000, 20, `sha512`)
    .toString(`hex`);
  return hash;
};
