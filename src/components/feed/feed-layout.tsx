import Link from "next/link";
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

interface FeedLayoutProps {
  posts: Post[];
  composer: ReactNode;
}

const quickLinks = [
  {
    title: "Next.js deep dives",
    description: "Unpack advanced routing, caching, and server actions with long-form write-ups from the community.",
    href: "https://github.com/vercel/next.js/discussions",
  },
  {
    title: "TypeScript clinic",
    description: "Drop your typing edge cases and learn how other engineers keep large apps maintainable.",
    href: "https://discord.gg/typescript",
  },
  {
    title: "Open-source pairing",
    description: "Find collaborators ready to tackle impactful good-first issues this weekend.",
    href: "https://github.com/topics/good-first-issue",
  },
  {
    title: "Design feedback loop",
    description: "Share interface experiments and collect thoughtful critique before you ship.",
    href: "https://www.figma.com/community",
  },
];

const learningTracks = [
  {
    title: "Ship faster",
    items: [
      "Daily engineering standups to keep momentum high.",
      "CI/CD templates tuned for hobby and production teams.",
      "Real deployment postmortems from SaaS builders.",
    ],
  },
  {
    title: "Grow together",
    items: [
      "Weekly async AMAs with maintainers and developer advocates.",
      "Accountability squads for indie founders and devrels.",
      "Hiring spotlights tailored to full-stack generalists.",
    ],
  },
];

export function FeedLayout({ posts, composer }: FeedLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <aside className="hidden flex-col gap-4 lg:flex">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick links</CardTitle>
              <CardDescription>
                Resources curated for engineers who want to exchange ideas and ship faster.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickLinks.map((link) => (
                <div key={link.title} className="rounded-md border border-border/60 p-3">
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {link.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {learningTracks.map((track) => (
            <Card key={track.title}>
              <CardHeader>
                <CardTitle className="text-base">{track.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </aside>

        <section className="space-y-6">
          {composer}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">The feed is warming up</CardTitle>
                  <CardDescription>
                    Be the first to share what you are experimenting with this week.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </section>

        <aside className="hidden xl:block">
          <CommunitySidebar />
        </aside>
      </div>
    </div>
  );
}
