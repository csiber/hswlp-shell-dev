import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Post } from "@/db/schema";

import { extractHashtags, formatRelativeDate, getUserHandle, getUserInitials } from "./feed-utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const hashtags = extractHashtags(post.content);

  return (
    <Card className="group relative overflow-hidden border border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_28px_72px_-34px_rgba(56,189,248,0.55)]">
      <div
        className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius)*2)] bg-gradient-to-br from-sky-500/15 via-transparent to-fuchsia-500/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-10 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl transition-transform duration-700 group-hover:translate-x-6 group-hover:-translate-y-4"
        aria-hidden
      />
      <CardHeader className="relative space-y-4 pb-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/40 via-cyan-400/30 to-fuchsia-400/40 blur-md opacity-60" />
            <Avatar className="relative h-12 w-12 border border-white/10 text-base font-semibold shadow-[0_8px_20px_rgba(14,165,233,0.35)]">
              <AvatarFallback className="bg-transparent text-sm font-semibold text-foreground">
                {getUserInitials(post.userId)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-semibold text-foreground/90">
              {getUserHandle(post.userId)}
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {formatRelativeDate(post.createdAt)}
            </p>
          </div>
          {hashtags.length > 0 ? (
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200/80 shadow-inner shadow-sky-500/40 transition-colors duration-300 group-hover:bg-sky-500/20 group-hover:text-sky-100 dark:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.3)]" />
              {hashtags[0]}
            </div>
          ) : null}
        </div>
        <CardTitle className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            {post.title}
          </span>
        </CardTitle>
      </CardHeader>
      {post.content ? (
        <CardContent className="relative overflow-hidden rounded-b-[calc(var(--radius)*2)] bg-gradient-to-br from-background/90 via-background/70 to-background/90 p-6">
          <div
            className="pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl"
            aria-hidden
          />
          <p className="relative whitespace-pre-wrap text-sm text-muted-foreground sm:text-base">
            {post.content}
          </p>
          {hashtags.length > 1 ? (
            <div className="relative mt-6 flex flex-wrap gap-2">
              {hashtags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>
      ) : null}
    </Card>
  );
}
