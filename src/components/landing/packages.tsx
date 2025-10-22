import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const packages = [
  {
    id: "launchpad",
    titleEn: "Launchpad Essentials",
    titleHu: "Launchpad Essentials csomag",
    status: { en: "Discovery", hu: "Felderítés alatt", variant: "secondary" as const },
    descriptionEn:
      "Kick-start a new community space with guided onboarding, editorial planning, and a welcoming knowledge base template.",
    descriptionHu:
      "Indítsd be az új közösségi teredet útmutatott beléptetéssel, szerkesztőségi tervezéssel és barátságos tudásbázis-sablonnal.",
    highlights: [
      {
        en: "Journey-based onboarding checklists for newcomers and mentors",
        hu: "Utazás-alapú beléptetési ellenőrzőlisták új tagoknak és mentoroknak",
      },
      {
        en: "Profile builder with multilingual bio prompts and skill tags",
        hu: "Profilkészítő kétnyelvű bemutatkozó kérdésekkel és készségcímkékkel",
      },
      {
        en: "Content calendar synced with announcements and newsletters",
        hu: "Tartalomnaptár bejelentésekhez és hírlevelekhez szinkronizálva",
      },
    ],
  },
  {
    id: "mentor-network",
    titleEn: "Mentor Network",
    titleHu: "Mentor Network csomag",
    status: { en: "Designing", hu: "Tervezés alatt", variant: "default" as const },
    descriptionEn:
      "Grow talent through structured mentorship, pairing algorithms, and milestone celebrations across disciplines.",
    descriptionHu:
      "Fejleszd a tehetséget strukturált mentorprogrammal, párosító algoritmusokkal és mérföldkő-ünneplésekkel több szakterületen.",
    highlights: [
      {
        en: "Adaptive matching engine considering goals, timezone, and preferred language",
        hu: "Adaptív párosító motor célok, időzóna és preferált nyelv figyelembevételével",
      },
      {
        en: "Session agendas, feedback forms, and automated follow-ups",
        hu: "Találkozó napirendek, visszajelző űrlapok és automatizált utánkövetések",
      },
      {
        en: "Badge system for mentors, mentees, and community champions",
        hu: "Jelvényrendszer mentoroknak, mentoráltaknak és közösségi hősöknek",
      },
    ],
  },
  {
    id: "community-insights",
    titleEn: "Community Insights",
    titleHu: "Community Insights csomag",
    status: { en: "Roadmap", hu: "Ütemtervben", variant: "outline" as const },
    descriptionEn:
      "Understand community health with real-time dashboards, sentiment tracking, and automated retrospectives for each circle.",
    descriptionHu:
      "Értsd meg a közösség egészségét valós idejű dashboardokkal, hangulatelemzéssel és automatizált retrospektívekkel minden műhelyhez.",
    highlights: [
      {
        en: "Engagement analytics across posts, projects, and events",
        hu: "Elköteleződési analitika bejegyzésekhez, projektekhez és eseményekhez",
      },
      {
        en: "Pulse surveys with bilingual templates and automated summaries",
        hu: "Pulzusfelmérések kétnyelvű sablonokkal és automatikus összegzésekkel",
      },
      {
        en: "Recommendations for next actions based on community signals",
        hu: "Ajánlások a következő lépésekhez közösségi jelek alapján",
      },
    ],
  },
];

export function Packages() {
  return (
    <section id="packages" className="py-24 sm:py-32 bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4">
            Packages · Csomagajánlatok
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Modular growth plans for every community stage
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Switch on capabilities as you need them – from onboarding toolkits to insight dashboards, each package is bilingual-ready out of the box.
          </p>
          <p className="mt-2 text-base leading-7 text-muted-foreground" lang="hu">
            Aktiváld a szükséges funkciókat lépésről lépésre – a beléptető eszköztáraktól az analitikai dashboardokig minden csomag kétnyelvűen használható.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>
                    {pkg.titleEn}
                    <span className="block text-sm font-normal text-muted-foreground" lang="hu">
                      {pkg.titleHu}
                    </span>
                  </CardTitle>
                  <Badge variant={pkg.status.variant}>
                    {pkg.status.en}
                    <span className="ml-1" lang="hu">
                      · {pkg.status.hu}
                    </span>
                  </Badge>
                </div>
                <CardDescription>
                  {pkg.descriptionEn}
                  <span className="mt-2 block" lang="hu">
                    {pkg.descriptionHu}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index}>
                      <span>{highlight.en}</span>
                      <span className="block text-xs" lang="hu">
                        {highlight.hu}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
