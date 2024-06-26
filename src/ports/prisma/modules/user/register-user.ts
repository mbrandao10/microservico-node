import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Users } from "@prisma/client";
import { hashPassword } from "@/util/hash-password";
import { generateCode } from "@/util/generete-code";
import { RegisterUserInDB } from "@/ports/adapters/db";

export const registerUser: RegisterUserInDB<Users> = async (
  data
): Promise<Users> => {
  try {
    const user = await db.users.findUnique({
      where: { email: data.email }
    });

    if (user) {
      throw new ConflictError("User already exists with this email");
    }

    const result = await db.users.create({
      data: {
        email: data.email,
        password: hashPassword(data.password ?? generateCode(15)),
        name: data.name,
        document_number: data.document_number,
        group_companies_ids: data.group_companies_ids ?? [],
        active: data.active ?? true
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to register user");
    }

    if (error instanceof ValidationError) {
      throw new ValidationError(error.message);
    }

    if (error instanceof ConflictError) {
      throw error;
    }

    throw new UnknownError();
  }
};
