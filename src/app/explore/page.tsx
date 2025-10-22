import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore",
  description: "Discover trending builders, updates, and conversations across the community.",
}

export default function ExplorePage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore the community</h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          Böngészd a legfrissebb megosztásokat, fedezz fel új projekteket, és kövesd, mit építenek a többiek.
        </p>
      </div>
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Hamarosan itt jelennek meg a kiemelt beszélgetések és az új felfedezések. Addig is nézz körül a Feedben!
        </p>
      </div>
    </main>
  )
}
