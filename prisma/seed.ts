import crypto from "crypto";
import authConfig from "../src/config/auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const hashPassword = (password: string): string => {
  const { salt } = authConfig;

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
};

const users = {
  user: {
    email: "user@mail.com",
    password: "123456",
    name: "user",
    document_number: "12233"
  },
  iury: {
    email: "iury@mail.com",
    password: "123456",
    name: "iury",
    document_number: "1222"
  }
};

const createUsers = async () => {
  const allPromises = Object.values(users).map(async (value) => {
    return await db.users.create({
      data: {
        name: value.name,
        email: value.email,
        password: hashPassword("123456"),
        document_number: "1222",
        group_companies_ids: []
      }
    });
  });
  await Promise.all(allPromises);
};

const main = async () => {
  await createUsers();
};

main().finally(async () => {
  await db.$disconnect();
  process.exit(0);
});
