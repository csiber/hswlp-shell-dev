import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Lightbulb, PlugZap, Rocket, Workflow } from "lucide-react"

import { PluginLibrary } from "@/components/plugin-center/plugin-library"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE_NAME } from "@/constants"
import { PLUGIN_CATEGORIES, PLUGIN_DEFINITIONS } from "@/data/plugin-center"

export const metadata: Metadata = {
  title: `Plugin Center | ${SITE_NAME}`,
  description:
    "HSWLP integrációs piactér: automatizáció, analitika és kollaborációs bővítmények egy helyen.",
}

const strategyHighlights = [
  {
    title: "Összeköthető rendszerek",
    description:
      "API-first pluginek, amelyek illeszkednek a meglévő fejlesztési folyamatokba és CI/CD pipeline-okba.",
    icon: PlugZap,
  },
  {
    title: "DevEx fókusz",
    description:
      "Type-safe SDK-k, példák és mintaprojektek, amelyek felgyorsítják a bevezetést a csapatodban.",
    icon: Workflow,
  },
  {
    title: "Folyamatos roadmap",
    description:
      "Átlátható fejlesztési terv, community driven visszajelzési ciklusokkal és korai hozzáféréssel.",
    icon: Rocket,
  },
] as const

const improvementIdeas = [
  {
    title: "Plugin telemetry dashboard",
    description:
      "Aggregált használati metrikák és hibajelentések, hogy lásd mely integrációk hoznak üzleti értéket.",
  },
  {
    title: "Sandbox környezet",
    description:
      "Izolált teszt projektek generálása egy kattintással, így kockázat nélkül próbálható ki egy új bővítmény.",
  },
  {
    title: "Fejlesztői sablonok",
    description:
      "Starter kit repo-k és CI workflow minta, hogy külsős partnerek is gyorsan tudjanak plugint készíteni.",
  },
] as const

export default function PluginCenterPage() {
  const sortedPlugins = [...PLUGIN_DEFINITIONS].sort((a, b) => Number(b.featured) - Number(a.featured))
  const upcomingPlugins = sortedPlugins.filter((plugin) => plugin.status === "soon")

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-10 sm:p-14">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
              Plugin Center
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Bővítsd a {SITE_NAME} ökoszisztémát moduláris integrációkkal
              </h1>
              <p className="text-lg text-muted-foreground">
                Fedezd fel azokat a bővítményeket, amelyek azonnal növelik a csapat produktivitását,
                és tudd meg, min dolgozunk a következő negyedévben.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {PLUGIN_CATEGORIES.map((category) => (
                <Badge key={category.id} variant="secondary" className="rounded-full border border-transparent bg-background/80">
                  {category.label}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="#konyvtar">Plugin könyvtár megnyitása</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-dashed">
                <Link href="mailto:plugins@hswlp.dev">Saját plugin beküldése</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {strategyHighlights.map((highlight) => (
              <Card key={highlight.title} className="border-border/60 bg-background/70 backdrop-blur">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <highlight.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {highlight.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.65fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Miért éri meg plugineket építeni?</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Rövid visszajelzési ciklus, közösségi validáció és új monetizációs lehetőségek.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Hozzáférés a fejlesztői közösséghez</h3>
              <p className="text-sm text-muted-foreground">
                Early adopter csatornák, ahol célzott feedback érkezik a még készülő funkciókról is.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Marketing támogatás</h3>
              <p className="text-sm text-muted-foreground">
                Spotlight megjelenés a havi hírlevélben és közösségi médiában.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Beépített billing</h3>
              <p className="text-sm text-muted-foreground">
                A Stripe bundle bevezetésével egyszerűen csomagolható a plugin a platform előfizetések mellé.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Minőségbiztosítás</h3>
              <p className="text-sm text-muted-foreground">
                Automata teszt pipeline és manuális review, hogy a marketplace stabil maradjon.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-dashed border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Roadmap highlight</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Kiemelt hamarosan érkező integrációk, amelyekhez most lehet várólistára jelentkezni.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingPlugins.map((plugin) => (
              <div key={plugin.id} className="rounded-xl border border-primary/30 bg-background/70 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{plugin.name}</span>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    Korai hozzáférés
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plugin.description}</p>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">
              Hiányzik egy kulcs integráció? Írj a <Link className="text-primary underline-offset-4 hover:underline" href="mailto:roadmap@hswlp.dev">roadmap@hswlp.dev</Link> címre.
            </p>
          </CardContent>
        </Card>
      </section>

      <div id="konyvtar">
        <PluginLibrary plugins={sortedPlugins} />
      </div>

      <section className="grid gap-4 rounded-3xl border border-border/70 bg-muted/40 p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">Javasolt következő fejlesztések</h2>
        </div>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Ezek a lépések rövid távon növelik a Plugin Center értékét, és felkészítik a platformot a partner ökoszisztéma bővítésére.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {improvementIdeas.map((idea) => (
            <Card key={idea.title} className="border-border/70 bg-background">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium uppercase tracking-wide">Javaslat</span>
                </div>
                <CardTitle className="text-lg">{idea.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {idea.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
