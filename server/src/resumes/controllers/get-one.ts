import auth from "../../auth/token";
import usePrisma from "../../config/prisma";

export default async function (token: string, resumeID: string) {
  try {
    const isValidToken = await auth.validate(token);

    if (!isValidToken) {
      return { ok: false, message: "could not validate token" } as const;
    }

    const user = await usePrisma.user.findUnique({
      where: { id: isValidToken },
      select: { resumes: { where: { id: resumeID } } },
    });

    if (!user) {
      return { ok: false, message: "user not found" } as const;
    }

    if (!user.resumes.length) {
      return { ok: false, message: "resume not found" } as const;
    }

    return { ok: true, data: user.resumes[0] } as const;
  } catch (error) {
    return {
      ok: false,
      message: "an error occured",
      cause: error instanceof Error ? error.message : undefined,
    } as const;
  }
}
