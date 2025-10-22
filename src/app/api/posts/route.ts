import { NextResponse } from "next/server";
import { ZSAError } from "zsa";

import { getAllPosts, createPost } from "@/db/post";
import { requireVerifiedEmail } from "@/utils/auth";
import { withRateLimit, RATE_LIMITS } from "@/utils/with-rate-limit";

export const runtime = "edge";

const errorResponse = (message: string, status: number) =>
  new NextResponse(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

const statusFromZsaErrorCode: Partial<Record<ZSAError["code"], number>> = {
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  TOO_MANY_REQUESTS: 429,
  PRECONDITION_FAILED: 412,
  CONFLICT: 409,
};

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

interface CreatePostRequest {
  title: string;
  content?: string | null;
}

export async function POST(request: Request) {
  try {
    const session = await requireVerifiedEmail();

    if (!session) {
      return errorResponse("Not authenticated", 401);
    }

    return await withRateLimit(
      async () => {
        const body = (await request.json()) as CreatePostRequest;
        const post = await createPost({
          userId: session.user.id,
          title: body.title,
          content: body.content,
        });
        return NextResponse.json(post);
      },
      RATE_LIMITS.CREATE_POST
    );
  } catch (error) {
    if (error instanceof ZSAError) {
      const status = statusFromZsaErrorCode[error.code] ?? 400;
      const message = typeof error.message === "string" && error.message.length > 0
        ? error.message
        : "Nem sikerült közzétennünk a bejegyzésed.";
      return errorResponse(message, status);
    }

    if (error instanceof Error) {
      if (error.message.toLowerCase().includes("rate limit exceeded")) {
        return errorResponse(error.message, 429);
      }

      console.error("Hiba a poszt létrehozásakor:", error);
    }

    return errorResponse(
      "Nem sikerült közzétennünk a bejegyzésed. Kérjük, próbáld meg később újra.",
      500
    );
  }
}
