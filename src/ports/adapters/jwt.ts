import { sign, verify } from "jsonwebtoken";
import authConfig from "@/config/auth";

type Payload = {
  name: string;
  id: string;
  email: string;
};

export type JWTPayload = {
  name: string;
  id: string;
  email: string;
  permissions?: any
};

export const verifyToken = (token: string) => {
  const { secret } = authConfig;
  const decoded = verify(token, secret);

  const { name, id, email } = decoded as JWTPayload;

  return {
    name,
    id,
    email
  };
};

export const generateToken = (
  user: Payload,
  token_expires_in?: string
): string => {
  const { secret, expiresIn } = authConfig;
  const expired: string = token_expires_in ?? expiresIn;
  const token = sign(
    {
      name: user.name,
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: expired
    }
  );

  return token;
};
