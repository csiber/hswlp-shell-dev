import type { ReactNode } from "react";

import type { Post } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PostCard } from "./post-card";
import { CommunitySidebar } from "./community-sidebar";
import {
  extractHashtags,
  formatRelativeDate,
  getTimestamp,
  getUserHandle,
  sortPostsByCreatedAt,
} from "./feed-utils";

interface FeedLayoutProps {
  posts: Post[];
  composer: ReactNode;
}

const quickLinks = [
  {
    title: "Next.js deep dives",
    description: "Long-form discussions that deconstruct routing, caching, and server actions in production apps.",
    href: "https://github.com/vercel/next.js/discussions",
  },
  {
    title: "TypeScript clinic",
    description: "Bring gnarly typing puzzles and learn how large teams keep their types sharp.",
    href: "https://discord.gg/typescript",
  },
  {
    title: "Open-source pairing",
    description: "Real contributors pairing on impactful, good-first issues right now.",
    href: "https://github.com/topics/good-first-issue",
  },
  {
    title: "Design feedback loop",
    description: "Interface explorations with thoughtful critiques from the Figma community.",
    href: "https://www.figma.com/community",
  },
];

export function FeedLayout({ posts, composer }: FeedLayoutProps) {
  const orderedPosts = sortPostsByCreatedAt(posts);
  const totalPosts = orderedPosts.length;
  const uniqueAuthors = new Set(orderedPosts.map((post) => post.userId)).size;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const postsThisWeek = orderedPosts.filter((post) => getTimestamp(post.createdAt) >= weekAgo).length;
  const lastUpdateLabel = orderedPosts[0]
    ? formatRelativeDate(orderedPosts[0].createdAt)
    : "Share the first update";
  const averageWordCount = calculateAverageWordCount(orderedPosts);
  const trendingHashtags = getTrendingHashtagsFromPosts(orderedPosts);
  const activityTimeline = buildActivityTimeline(orderedPosts);
  const latestHeadlines = getLatestHeadlines(orderedPosts);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-36 -z-10 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl"
        aria-hidden
      />
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_340px]">
        <aside className="hidden flex-col gap-6 lg:flex">
          <Card className="aurora-panel border border-border/50 text-sm text-muted-foreground">
            <CardHeader className="relative pb-6 text-foreground">
              <p className="text-xs uppercase tracking-[0.4em] text-sky-500/80">Navigation</p>
              <CardTitle className="text-xl">Live resources</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Trusted references the community is actively sharing this week.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative flex flex-col gap-1 rounded-xl border border-border/60 bg-background/85 px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/70 hover:bg-sky-500/10"
                >
                  <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground/80">
                    {link.description}
                  </span>
                  <span className="absolute right-3 top-3 text-xs font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="glassy-surface border border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-foreground">Seven-day activity</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Real post counts aggregated per day.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 grid gap-3">
              {activityTimeline.map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <div className="flex w-16 flex-col text-xs font-semibold text-muted-foreground">
                    <span className="uppercase tracking-wide text-foreground/70">{day.weekday}</span>
                    <span>{day.dayLabel}</span>
                  </div>
                  <div className="h-2 flex-1 rounded-full bg-muted/60">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all duration-700"
                      style={{ width: `${day.fill}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-foreground/80">{day.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-8">
          <FeedHero
            totalPosts={totalPosts}
            postsThisWeek={postsThisWeek}
            activeCreators={uniqueAuthors}
            lastUpdateLabel={lastUpdateLabel}
            averageWordCount={averageWordCount}
            trendingHashtags={trendingHashtags}
            latestHeadlines={latestHeadlines}
          />
          {composer}
          <div className="space-y-5">
            {posts.length === 0 ? (
              <Card className="glassy-surface border border-dashed border-sky-500/40 text-center shadow-inner shadow-sky-500/20">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">The feed is warming up</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Publish the first milestone and kick off a stream of real-world updates.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              orderedPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </section>

        <aside className="hidden xl:block">
          <CommunitySidebar posts={orderedPosts} />
        </aside>
      </div>
    </div>
  );
}

interface FeedHeroProps {
  totalPosts: number;
  postsThisWeek: number;
  activeCreators: number;
  lastUpdateLabel: string;
  averageWordCount: number;
  trendingHashtags: string[];
  latestHeadlines: {
    id: string;
    title: string;
    handle: string;
    timeLabel: string;
  }[];
}

function FeedHero({
  totalPosts,
  postsThisWeek,
  activeCreators,
  lastUpdateLabel,
  averageWordCount,
  trendingHashtags,
  latestHeadlines,
}: FeedHeroProps) {
  return (
    <div className="aurora-panel overflow-hidden border border-border/60 px-6 py-8 text-sm text-muted-foreground">
      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.45em] text-sky-200/80">Community pulse</p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Where builders share the work in motion
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Every metric below is calculated from real posts in the hub&mdash;no dummy data, just the live
              heartbeat of the community.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <StatCard
              label="Total posts"
              value={totalPosts.toLocaleString("en-US")}
              helper={
                postsThisWeek > 0
                  ? `+${postsThisWeek.toLocaleString("en-US")} this week`
                  : "Waiting for fresh drops"
              }
            />
            <StatCard
              label="Active creators"
              value={activeCreators.toLocaleString("en-US")}
              helper="Unique authors contributing"
            />
            <StatCard label="Latest update" value={lastUpdateLabel} helper="Tracked in real time" />
            <StatCard
              label="Avg. post length"
              value={averageWordCount > 0 ? `${averageWordCount} words` : "—"}
              helper="Words per post"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
            <span>Real tags trending now</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.length > 0 ? (
              trendingHashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-sky-400/50 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-100 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.6)] transition duration-300 hover:border-sky-300 hover:text-white"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Posts have not introduced tags yet&mdash;share yours to kick things off.
              </span>
            )}
          </div>
        </div>

        <LiveTicker items={latestHeadlines} />
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
}

function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="group glassy-surface relative overflow-hidden rounded-2xl border border-white/10 px-4 py-3 shadow-[0_20px_40px_-30px_rgba(56,189,248,0.65)]">
      <div className="pointer-events-none absolute -inset-px rounded-[22px] bg-gradient-to-br from-sky-500/20 via-transparent to-fuchsia-500/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{label}</span>
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground/80">{helper}</span>
      </div>
    </div>
  );
}

interface LiveTickerProps {
  items: {
    id: string;
    title: string;
    handle: string;
    timeLabel: string;
  }[];
}

function LiveTicker({ items }: LiveTickerProps) {
  if (items.length === 0) {
    return null;
  }

  const tickerItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-slate-900/90 via-sky-900/80 to-slate-900/90 py-3 shadow-[0_25px_60px_-40px_rgba(30,64,175,0.65)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent opacity-80" />
      <ul className="flex min-w-max animate-marquee items-center gap-8 pl-6 text-sm font-semibold text-sky-100">
        {tickerItems.map((item, index) => (
          <li key={`${item.id}-${index}`} className="flex items-center gap-4 whitespace-nowrap">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
            <span className="text-xs uppercase tracking-[0.4em] text-emerald-200/80">Live</span>
            <span className="text-sm font-semibold text-white/90">{item.title}</span>
            <span className="text-xs font-medium text-sky-200/80">{item.handle}</span>
            <span className="text-[11px] font-medium text-slate-300/70">{item.timeLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function calculateAverageWordCount(posts: Post[]) {
  if (posts.length === 0) {
    return 0;
  }

  const totalWords = posts.reduce((acc, post) => {
    const content = `${post.title ?? ""} ${post.content ?? ""}`;
    const words = content.match(/[\p{L}\d']+/gu);
    return acc + (words ? words.length : 0);
  }, 0);

  return Math.round(totalWords / posts.length);
}

function getTrendingHashtagsFromPosts(posts: Post[]) {
  const counts = new Map<string, { count: number; original: string }>();

  for (const post of posts) {
    const hashtags = extractHashtags(post.content);
    if (hashtags.length === 0) {
      continue;
    }

    const uniqueInPost = new Set<string>();
    for (const tag of hashtags) {
      const normalized = tag.toLowerCase();
      if (uniqueInPost.has(normalized)) {
        continue;
      }
      uniqueInPost.add(normalized);

      const current = counts.get(normalized) ?? { count: 0, original: tag };
      counts.set(normalized, { count: current.count + 1, original: current.original });
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1].count - a[1].count || a[1].original.localeCompare(b[1].original))
    .slice(0, 3)
    .map(([, value]) => value.original);
}

function getLatestHeadlines(posts: Post[]) {
  return posts
    .filter((post) => post.title.trim().length > 0)
    .slice(0, 6)
    .map((post) => ({
      id: post.id,
      title: post.title,
      handle: getUserHandle(post.userId),
      timeLabel: formatRelativeDate(post.createdAt),
    }));
}

function buildActivityTimeline(posts: Post[]) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const counts = new Map<string, number>();
  for (const post of posts) {
    const time = getTimestamp(post.createdAt);
    if (time === 0) {
      continue;
    }

    const date = new Date(time);
    date.setHours(0, 0, 0, 0);
    const key = date.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const timeline: { date: string; weekday: string; dayLabel: string; count: number; fill: number }[] = [];
  let maxCount = 0;

  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(now);
    day.setDate(day.getDate() - offset);
    const key = day.toISOString().slice(0, 10);
    const count = counts.get(key) ?? 0;
    maxCount = Math.max(maxCount, count);

    timeline.push({
      date: key,
      weekday: day.toLocaleDateString("en-US", { weekday: "short" }),
      dayLabel: day.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }),
      count,
      fill: 0,
    });
  }

  return timeline.map((entry) => {
    const percentage = maxCount === 0 ? 0 : (entry.count / maxCount) * 100;
    const fill = entry.count === 0 ? 0 : Math.max(18, Math.min(100, percentage));

    return {
      ...entry,
      fill,
    };
  });
}
