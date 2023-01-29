import { PrismaClient } from "@prisma/client";

const usePrisma = new PrismaClient();

export async function PrismaConnect() {
  try {
    await usePrisma.$connect();
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
}

export default usePrisma;
