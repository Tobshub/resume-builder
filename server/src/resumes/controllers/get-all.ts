import usePrisma from "../../config/prisma";
import auth from "../../auth/token";

// get all resumes a user has
export default async function (token: string) {
  try {
    const isValidToken = await auth.validate(token);

    if (!isValidToken) {
      return { ok: false, message: "failed to validate token" } as const;
    }

    const resumes = await usePrisma.user.findUnique({
      where: { id: isValidToken },
      select: { resumes: true },
    });

    if (!resumes) {
      return { ok: false, message: "user not found" } as const;
    }

    return { ok: true, data: resumes } as const;
  } catch (error) {
    console.error(error);
    return { ok: false, message: "internal server error" } as const;
  }
}
