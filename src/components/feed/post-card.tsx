import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Post } from "@/db/schema";

interface PostCardProps {
  post: Post;
}

function formatRelativeDate(dateLike: Date | number | string | null | undefined) {
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

function getUserInitials(userId: string) {
  if (!userId) {
    return "??";
  }

  const cleaned = userId.replace(/^usr_/, "").trim();
  if (!cleaned) {
    return "??";
  }

  return cleaned.slice(0, 2).toUpperCase();
}

function getUserHandle(userId: string) {
  if (!userId) {
    return "@community-member";
  }

  const cleaned = userId.replace(/^usr_/, "").trim();
  if (!cleaned) {
    return "@community-member";
  }

  return `@${cleaned}`;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="text-sm font-medium">
              {getUserInitials(post.userId)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">{getUserHandle(post.userId)}</p>
            <p className="text-xs text-muted-foreground">
              {formatRelativeDate(post.createdAt)}
            </p>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold leading-tight text-foreground">
          {post.title}
        </CardTitle>
      </CardHeader>
      {post.content ? (
        <CardContent>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground sm:text-base">
            {post.content}
          </p>
        </CardContent>
      ) : null}
    </Card>
  );
}
