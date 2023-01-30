import usePrisma from "../../config/prisma";
import { env } from "../..";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// register a new user
export default async function (input: {
  email: string;
  name: string;
  password: string;
}) {
  // check if a user exists with that email
  const oldUser = await usePrisma.user.findUnique({
    where: { email: input.email },
  });
  if (!oldUser) {
    const newUser = await usePrisma.user
      .create({
        data: {
          email: input.email,
          name: input.name,
          password: await bcrypt.hash(
            input.password,
            10
          ) /** hash password before storage */,
        },
      })
      .catch(console.error);
    if (!newUser) {
      return { ok: false as const, message: "an error occured" };
    }
    // create token
    if (!env.jwtSecret) {
      console.error("Error: jwt secret is missing");
      return { ok: false as const, message: "internal server error" };
    }

    const token = jwt.sign(
      newUser.id /** sign the token with the user's id */,
      env.jwtSecret
    );

    return { ok: true as const, data: { token } };
  }
  return { ok: false as const, message: "user already exists" };
}
