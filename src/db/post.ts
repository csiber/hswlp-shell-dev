import { getDB } from "./index";
import { postTable } from "./schema";
import { eq } from "drizzle-orm";

function isMissingPostTableError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  if (message.includes("no such table: post")) {
    return true;
  }

  const cause = (error as { cause?: unknown }).cause;
  if (cause instanceof Error) {
    return cause.message.toLowerCase().includes("no such table: post");
  }

  return false;
}

export async function getAllPosts() {
  const db = getDB();
  try {
    return await db.select().from(postTable);
  } catch (error) {
    if (isMissingPostTableError(error)) {
      console.warn(
        "Posts tábla nem létezik a D1 adatbázisban, üres listát adunk vissza.",
        error,
      );
      return [];
    }

    throw error;
  }
}

export async function createPost(data: {
  userId: string;
  title: string;
  content?: string | null;
}) {
  const db = getDB();
  const [post] = await db.insert(postTable).values(data).returning();
  return post;
}

export async function getPostById(id: string) {
  const db = getDB();
  return db.query.postTable.findFirst({ where: eq(postTable.id, id) });
}
