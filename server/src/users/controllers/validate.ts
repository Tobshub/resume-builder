import usePrisma from "../../config/prisma";
import { env } from "../..";
import jwt from "jsonwebtoken";

// valid tokens
export default async function (input: { token: string }) {
  try {
    if (!env.jwtSecret) {
      console.error("Error: jwt secret is missing");
      return { ok: false as const, message: "internal server error" };
    }
    // decode the id from the input token
    const id = jwt.verify(input.token, env.jwtSecret);

    if (typeof id === "string") {
      const user = await usePrisma.user.findUnique({
        where: { id: id },
        // only retrieve these fields
        select: { email: true, name: true, resumes: true },
      });

      if (!user) {
        return { ok: false as const, message: "no user found" };
      }
      return { ok: true as const, data: { user } };
    }
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      console.error("Error: that's the wrong jwt secret");
    }
    return { ok: false as const, message: "internal server error" };
  }
}
