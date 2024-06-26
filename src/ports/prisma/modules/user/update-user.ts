import { db } from "@/ports/prisma/prisma";
import { ConflictError, UnknownError, ValidationError } from "@/helpers/error";
import { Users } from "@prisma/client";
import { UpdateUserInDB } from "@/ports/adapters/db";

export const updateUser: UpdateUserInDB<Users> = async (
  data
): Promise<Users> => {
  try {
    const user = await db.users.findUnique({
      where: { id: data.user_id }
    });

    if (!user) {
      throw new ValidationError("User not found");
    }

    const userByEmail = await db.users.findUnique({
      where: { email: data.email }
    });

    if (userByEmail && userByEmail.id !== data.user_id) {
      throw new ValidationError("The email provided already exists for another user.");
    }

    const result = await db.users.update({
      where: { id: data.user_id },
      data: {
        name: data.name,
        email: data.email,
        active: data.active,
        document_number: data.document_number,
        group_companies_ids: data.group_companies_ids
      }
    });

    return result;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw new ValidationError("Failed to update user");
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