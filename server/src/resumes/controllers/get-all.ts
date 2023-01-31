import usePrisma from "../../config/prisma";
import validate from "../../auth/validate";

// get all resumes a user has
export default async function (token: string) {
  try {
    const isValidToken = await validate({ token });

    switch (typeof isValidToken) {
      case "boolean": {
        throw new Error("secret might be missing");
      }
      case "object": {
        return { ok: false as const, message: "token validation failed" };
      }
      case "string": {
        const data = await usePrisma.user.findUnique({
          where: { id: isValidToken },
          select: { resumes: true },
        });
        if (!data) {
          return { ok: false as const, message: "could not find user" };
        }
        return { ok: true as const, data: { resumes: data.resumes } };
      }
      default: {
        console.trace("Unexpected Type");
      }
    }
  } catch (error) {
    console.error(error);
    return { ok: false as const, message: "internal server error" };
  }
}
