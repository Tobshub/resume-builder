import { env } from "..";
import jwt from "jsonwebtoken";

// valid tokens
export default async function (input: { token: string }) {
  try {
    if (!env.jwtSecret) {
      console.error("Error: jwt secret is missing");
      return false;
    }
    // decode the id from the input token
    const id = jwt.verify(input.token, env.jwtSecret);

    return id as string;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return { error: "invalid_token" } as const;
    }
    return false;
  }
}
