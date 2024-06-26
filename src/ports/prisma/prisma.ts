import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      $allOperations({ operation, args, query }: any) {
        const test = [
          "findUnique",
          "findFirst",
          "findMany",
          "count",
          "aggregate",
          "groupBy",
          "min",
          "max",
          "sum",
          "average"
        ];

        if (test.includes(operation) && !args?.where?.includeDeleted) {
          args.where = { ...args.where, deleted: false };

          return query(args);
        }
        delete args?.where?.includeDeleted;
        return query(args);
      }
    }
  }
});

export const db = prisma;
