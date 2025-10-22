import { Button } from "@/components/ui/button";
import { GITHUB_REPO_URL } from "@/constants";
import Link from "next/link";
import ShinyButton from "@/components/ui/shiny-button";
import { getTotalUsers } from "@/utils/stats";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function Hero() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div className="pt-20 pb-24 sm:pt-20 sm:pb-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-10 flex justify-center gap-4 flex-wrap">
              <ShinyButton className="rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                Community built · Közösség építette
              </ShinyButton>
              <Suspense fallback={<TotalUsersButtonSkeleton />}>
                <TotalUsersButton />
              </Suspense>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              The developer commons for building together
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Share ideas, showcase projects, and mentor fellow makers across web, game, and experimental tech in one open hub.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground" lang="hu">
              Oszd meg ötleteidet, mutasd be projektjeidet és támogasd fejlesztőtársaidat a webes, játék- és kísérleti technológiák világából egyetlen nyílt közösségi térben.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4 md:gap-x-6">
              <Link href="/sign-up">
                <Button size="lg" className="rounded-full">
                  Join the community · Csatlakozz a közösséghez
                </Button>
              </Link>
              <Link href="#packages">
                <Button variant="outline" size="lg" className="rounded-full">
                  Explore packages · Fejlesztési csomagok
                </Button>
              </Link>
              <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="lg" className="rounded-full">
                  GitHub roadmap
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This component will be wrapped in Suspense
async function TotalUsersButton() {
  const totalUsers = await getTotalUsers();

  if (!totalUsers) return null;

  return (
    <ShinyButton className="rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
      {totalUsers}+ developers worldwide · {totalUsers}+ fejlesztő világszerte
    </ShinyButton>
  );
}

// Skeleton fallback for the TotalUsersButton
function TotalUsersButtonSkeleton() {
  return (
    <div className="rounded-full bg-purple-500/10 ring-1 ring-inset ring-purple-500/20 px-4 py-1.5 text-sm font-medium">
      <Skeleton className="w-32 h-5" />
    </div>
  );
}
