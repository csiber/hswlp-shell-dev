import type { Post } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { extractHashtags, formatRelativeDate, getTimestamp, getUserHandle, sortPostsByCreatedAt } from "./feed-utils";

interface CommunitySidebarProps {
  posts: Post[];
}

const STOP_WORDS = new Set(
  [
    "the",
    "this",
    "that",
    "with",
    "from",
    "your",
    "about",
    "into",
    "and",
    "for",
    "into",
    "will",
    "have",
    "what",
    "when",
    "how",
    "next",
    "need",
    "make",
    "keep",
    "more",
    "code",
    "team",
    "like",
    "just",
    "over",
    "post",
    "update",
    "share",
  ].map((word) => word.toLowerCase()),
);

export function CommunitySidebar({ posts }: CommunitySidebarProps) {
  const orderedPosts = sortPostsByCreatedAt(posts);
  const latestPosts = orderedPosts.slice(0, 3);
  const topAuthors = getTopAuthors(posts).slice(0, 4);
  const { topHashtags, fallbackKeywords } = getTagAndKeywordHighlights(posts);

  return (
    <div className="space-y-4">
      <Card className="glassy-surface border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Latest releases</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Fresh posts from the feed, pulled straight from the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              When the first update ships it will land here instantly.
            </p>
          ) : (
            latestPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-sky-500/5"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  <span className="truncate">{getUserHandle(post.userId)}</span>
                  <span>{formatRelativeDate(post.createdAt)}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{post.title}</h3>
                {post.content ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.content.length > 180 ? `${post.content.slice(0, 177)}…` : post.content}
                  </p>
                ) : null}
              </article>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="glassy-surface border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Top contributors</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Ranked by number of published posts and their latest activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {topAuthors.length === 0 ? (
            <p className="text-sm text-muted-foreground">We are ready to celebrate the very first author.</p>
          ) : (
            topAuthors.map((author) => (
              <div
                key={author.userId}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{author.handle}</span>
                  <span className="text-xs text-muted-foreground">{author.lastUpdateLabel}</span>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-500">
                  {author.count} post{author.count === 1 ? "" : "s"}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="glassy-surface border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Live tags &amp; keywords</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Surfacing real topics extracted from current titles and content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topHashtags.length > 0 ? (
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {topHashtags.map((tag) => (
                <li
                  key={tag.name}
                  className="flex items-center justify-between rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-sky-100"
                >
                  <span>{tag.name}</span>
                  <span className="text-[11px] text-sky-50/80">{tag.count} mentions</span>
                </li>
              ))}
            </ul>
          ) : fallbackKeywords.length > 0 ? (
            <ul className="grid gap-2 text-sm">
              {fallbackKeywords.map((keyword) => (
                <li
                  key={keyword.term}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  <span>{keyword.term}</span>
                  <span className="text-[11px] text-muted-foreground/80">{keyword.count} mentions</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tags will appear automatically once posts include them.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getTopAuthors(posts: Post[]) {
  const authors = new Map<
    string,
    {
      count: number;
      lastTimestamp: number;
    }
  >();

  for (const post of posts) {
    const current = authors.get(post.userId) ?? { count: 0, lastTimestamp: 0 };
    const timestamp = getTimestamp(post.createdAt);
    authors.set(post.userId, {
      count: current.count + 1,
      lastTimestamp: Math.max(current.lastTimestamp, timestamp),
    });
  }

  return Array.from(authors.entries())
    .map(([userId, data]) => ({
      userId,
      handle: getUserHandle(userId),
      count: data.count,
      lastUpdateLabel: data.lastTimestamp
        ? formatRelativeDate(data.lastTimestamp)
        : "Awaiting first post",
    }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      const bTimestamp = authors.get(b.userId)?.lastTimestamp ?? 0;
      const aTimestamp = authors.get(a.userId)?.lastTimestamp ?? 0;
      return bTimestamp - aTimestamp;
    });
}

function getTagAndKeywordHighlights(posts: Post[]) {
  const hashtagCounts = new Map<string, number>();
  const keywordCounts = new Map<string, number>();

  for (const post of posts) {
    const hashtags = extractHashtags(post.content);
    const uniqueHashtags = new Set<string>();
    for (const tag of hashtags) {
      const normalized = tag.toLowerCase();
      if (uniqueHashtags.has(normalized)) {
        continue;
      }
      uniqueHashtags.add(normalized);
      hashtagCounts.set(normalized, (hashtagCounts.get(normalized) ?? 0) + 1);
    }

    const text = `${post.title} ${post.content ?? ""}`.toLowerCase();
    const words = text.match(/[\p{L}\d]{4,}/gu) ?? [];
    const uniqueWords = new Set(words);
    for (const word of uniqueWords) {
      if (STOP_WORDS.has(word)) {
        continue;
      }
      keywordCounts.set(word, (keywordCounts.get(word) ?? 0) + 1);
    }
  }

  const topHashtags = Array.from(hashtagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([name, count]) => ({ name: name.startsWith("#") ? name : `#${name}`, count }));

  const fallbackKeywords = Array.from(keywordCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([term, count]) => ({ term, count }));

  return { topHashtags, fallbackKeywords };
}
