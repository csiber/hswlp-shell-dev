import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featuredDiscussions = [
  {
    title: "Building resilient background workers",
    description: "Share battle-tested patterns for queues, retries, and observability.",
  },
  {
    title: "Frontend performance wins",
    description: "Profiling war stories from teams squeezing every millisecond from React apps.",
  },
  {
    title: "Design systems in the wild",
    description: "Document how you keep tokens, components, and accessibility in sync across squads.",
  },
];

const upcomingEvents = [
  {
    time: "Thursday 16:00 UTC",
    title: "Live code review: Next.js server actions",
  },
  {
    time: "Friday 18:30 UTC",
    title: "Open source pairing café",
  },
  {
    time: "Saturday 14:00 UTC",
    title: "Community demo day for indie SaaS launches",
  },
];

const supportChannels = [
  "#help-typescript",
  "#design-critiques",
  "#ops-and-infra",
  "#career-growth",
];

export function CommunitySidebar() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Featured discussions</CardTitle>
          <CardDescription>
            High-signal threads worth bookmarking when you need inspiration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredDiscussions.map((item) => (
            <div key={item.title}>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live sessions</CardTitle>
          <CardDescription>
            Join upcoming hangouts and share your screen with fellow developers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="rounded-md border border-border/60 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{event.time}</p>
              <p className="text-sm font-semibold">{event.title}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Drop-in channels</CardTitle>
          <CardDescription>
            Asynchronous rooms for quick feedback or deep technical dives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {supportChannels.map((channel) => (
              <li
                key={channel}
                className="rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                {channel}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
