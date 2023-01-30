import usePrisma from "../../config/prisma";
import { env } from "../..";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// login user (return a new token)
export default async function (input: {
  email: string;
  password: string;
}) {
  const user = await usePrisma.user.findUnique({
    where: { email: input.email },
    include: { resumes: true },
  });

  if (!user) {
    return { ok: false as const, message: "user not found" };
  }

  // compare plain and hashed passwords
  const validate = await bcrypt.compare(user.password, user.password);

  if (!validate) {
    return { ok: false as const, message: "email or password is wrong" };
  }

  // send token to the user
  if (!env.jwtSecret) {
    console.error("Error: jwt secret is missing");
    return { ok: false as const, message: "internal server error" };
  }

  const token = jwt.sign(
    user.id /** sign the token with the user's id */,
    env.jwtSecret
  );

  return { ok: true as const, data: { token } };
}
