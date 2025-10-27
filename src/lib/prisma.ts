import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient(
  { log: [{ emit: "event", level: "error" }], }
);
prisma.$on("error", (e: any) => {
  console.log("📌 Query:", e);
});
