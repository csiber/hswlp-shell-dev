import type { Post } from "@/db/schema";

export function formatRelativeDate(dateLike: Date | number | string | null | undefined) {
  if (!dateLike) {
    return "Just now";
  }

  const date =
    dateLike instanceof Date
      ? dateLike
      : new Date(typeof dateLike === "number" ? dateLike : Date.parse(dateLike));

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) {
    return "Just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString();
}

export function getUserInitials(userId: string) {
  if (!userId) {
    return "??";
  }

  const cleaned = userId.replace(/^usr_/, "").trim();
  if (!cleaned) {
    return "??";
  }

  return cleaned.slice(0, 2).toUpperCase();
}

export function getUserHandle(userId: string) {
  if (!userId) {
    return "@community-member";
  }

  const cleaned = userId.replace(/^usr_/, "").trim();
  if (!cleaned) {
    return "@community-member";
  }

  return `@${cleaned}`;
}

export function extractHashtags(text: string | null | undefined) {
  if (!text) {
    return [] as string[];
  }

  const matches = text.match(/#[\p{L}\d_-]+/gu);
  if (!matches) {
    return [] as string[];
  }

  const unique = new Map<string, string>();
  for (const tag of matches) {
    const normalized = tag.toLowerCase();
    if (!unique.has(normalized)) {
      unique.set(normalized, tag);
    }
  }

  return Array.from(unique.values());
}

export function sortPostsByCreatedAt(posts: Post[]) {
  return [...posts].sort((a, b) => {
    const aTime = getTimestamp(a.createdAt);
    const bTime = getTimestamp(b.createdAt);

    return bTime - aTime;
  });
}

export function getTimestamp(dateLike: Date | number | string | null | undefined) {
  if (!dateLike) {
    return 0;
  }

  if (dateLike instanceof Date) {
    return dateLike.getTime();
  }

  if (typeof dateLike === "number") {
    return dateLike;
  }

  const parsed = Date.parse(dateLike);
  return Number.isNaN(parsed) ? 0 : parsed;
}
