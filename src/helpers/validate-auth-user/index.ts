import { generateToken } from "@/ports/adapters/jwt";

type UserPayload = {
  id: string;
  email: string;
  name: string;
};

type ValidateAuthUserInput = {
  user: UserPayload;
};

type ValidateAuthUserOutput = {
  token?: string;
  email: string;
  name: string;
};

export const ValidateAuthUser = async ({
  user
}: ValidateAuthUserInput): Promise<ValidateAuthUserOutput> => {
  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name
  });

  return {
    token: token,
    email: user.email,
    name: user.name
  };
};
