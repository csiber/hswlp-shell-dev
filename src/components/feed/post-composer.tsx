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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preparing your workspace…</CardTitle>
          <CardDescription>
            We are verifying your session so you can jump straight into the conversation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sign in to share</CardTitle>
          <CardDescription>
            Join the community to post milestones, request feedback, and follow other builders.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-0">
        <CardHeader>
          <CardTitle className="text-lg">Share something the community should see</CardTitle>
          <CardDescription>
            Highlight what you shipped, what you are exploring next, or ask for targeted help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Posts are visible to every signed-in builder and the wider public feed.
          </p>
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? "Publishing…" : "Publish update"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
