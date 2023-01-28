import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PrismaConnect() {
  try {
    await prisma.$connect();
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
}

export default prisma;
