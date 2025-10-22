"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSessionStore } from "@/state/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function PostComposer() {
  const { session, isLoading } = useSessionStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const composerId = "share-update";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      setError("You need to be signed in to share an update.");
      return;
    }

    if (!title.trim()) {
      setError("Give your update a clear headline before posting.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim() ? content.trim() : null,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "We could not publish your post. Please try again.");
      }

      setTitle("");
      setContent("");

      startTransition(() => {
        router.refresh();
      });
    } catch (postError) {
      if (postError instanceof Error) {
        setError(postError.message);
      } else {
        setError("Something went wrong while publishing. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card
        id={composerId}
        className="aurora-panel relative overflow-hidden border border-border/60 px-6 py-6 text-sm text-muted-foreground"
      >
        <div className="pointer-events-none absolute -top-16 right-10 h-36 w-36 rounded-full bg-sky-500/20 blur-3xl" />
        <CardHeader className="glow-divider pb-6">
          <CardTitle className="text-xl font-semibold text-foreground">Preparing your workspace…</CardTitle>
          <CardDescription className="max-w-lg text-sm text-muted-foreground">
            We are verifying your session so you can jump straight into the conversation.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card
        id={composerId}
        className="aurora-panel relative overflow-hidden border border-border/60 px-6 py-6 text-sm text-muted-foreground"
      >
        <div className="pointer-events-none absolute -top-16 right-10 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <CardHeader className="glow-divider pb-6">
          <CardTitle className="text-xl font-semibold text-foreground">Sign in to share</CardTitle>
          <CardDescription className="max-w-lg text-sm text-muted-foreground">
            Join the community to post milestones, request feedback, and follow other builders.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-6">
          <Button asChild className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-sm font-semibold text-white shadow-[0_20px_40px_-28px_rgba(56,189,248,0.7)] transition-transform duration-300 hover:scale-[1.02]">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      id={composerId}
      className="aurora-panel relative overflow-hidden border border-border/60 px-6 py-6 text-sm text-muted-foreground"
    >
      <div className="pointer-events-none absolute -top-20 left-8 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-6 h-52 w-52 rounded-full bg-purple-500/15 blur-3xl" />
      <form onSubmit={handleSubmit} className="space-y-0">
        <CardHeader className="glow-divider pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Share something the community should see
              </CardTitle>
              <CardDescription className="max-w-xl text-sm text-muted-foreground">
                Highlight what you shipped, what you are exploring next, or ask for targeted help.
              </CardDescription>
            </div>
            <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-100">
              Live
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="post-title">
              Headline
            </label>
            <Input
              id="post-title"
              placeholder="Shipped a new auth flow for the docs platform"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitting || isPending}
              maxLength={255}
              required
              className="border border-border/60 bg-background/80 text-sm transition-all duration-300 focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="post-content">
              Details (optional)
            </label>
            <Textarea
              id="post-content"
              placeholder="Share the context, learnings, or open questions for the crew."
              value={content}
              onChange={(event) => setContent(event.target.value)}
              disabled={isSubmitting || isPending}
              rows={5}
              className="border border-border/60 bg-background/80 text-sm transition-all duration-300 focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/30"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Posts are visible to every signed-in builder and the wider public feed.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="group relative overflow-hidden bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-6 text-sm font-semibold text-white shadow-[0_20px_40px_-28px_rgba(56,189,248,0.7)] transition-transform duration-300 hover:scale-[1.03] disabled:opacity-70"
          >
            <span className="relative z-10">
              {isSubmitting || isPending ? "Publishing…" : "Publish update"}
            </span>
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
