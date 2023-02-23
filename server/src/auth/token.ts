import { env } from "..";
import jwt from "jsonwebtoken";

const auth = {
  // validate tokens
  async validate(token: string) {
    try {
      if (!env.jwtSecret) {
        console.error("Error: jwt secret is missing");
        return false;
      }

      const id = jwt.verify(token, env.jwtSecret);

      return id as string;
    } catch (e) {
      // if (e instanceof jwt.JsonWebTokenError) {
      //   return { error: "invalid_token" } as const;
      // }
      return false;
    }
  },
  async generate(input: string) {
    try {
      if (!env.jwtSecret) {
        console.error("Error: jwt secret is missing");
        return false;
      }

      const token = jwt.sign(input, env.jwtSecret);
      return token;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default auth;
