export const PLUGIN_CATEGORIES = [
  {
    id: "automation",
    label: "Automatizálás",
    description: "Workflow-ok, időzített futtatások és trigger alapú folyamatok kezelése.",
  },
  {
    id: "analytics",
    label: "Analitika",
    description: "Központi mutatók, riportok és produktivitási visszajelzések.",
  },
  {
    id: "collaboration",
    label: "Kollaboráció",
    description: "Csapatmunka támogatása és cross-project kommunikáció.",
  },
  {
    id: "delivery",
    label: "Szállítás",
    description: "CI/CD, release menedzsment és deployment automatizáció.",
  },
  {
    id: "extensions",
    label: "Kiterjesztések",
    description: "Egyedi UI komponensek, modulok és marketplace kiegészítők.",
  },
] as const

export type PluginCategoryId = (typeof PLUGIN_CATEGORIES)[number]["id"]

export type PluginStatus = "stable" | "beta" | "soon"

export interface PluginDefinition {
  id: string
  name: string
  description: string
  categoryId: PluginCategoryId
  status: PluginStatus
  tags: string[]
  featured?: boolean
  action?: {
    label: string
    href?: string
    target?: "_blank"
  }
}

export const PLUGIN_DEFINITIONS: PluginDefinition[] = [
  {
    id: "notion-sync",
    name: "Notion kétirányú szinkron",
    description:
      "Automatikusan tükrözi a Notion adatbázisok változásait a HSWLP projektekben, és vissza is ír státuszokat.",
    categoryId: "collaboration",
    status: "beta",
    tags: ["notion", "sync", "csapat"],
    featured: true,
    action: {
      label: "Béta hozzáférés igénylése",
    },
  },
  {
    id: "figma-components",
    name: "Figma komponens import",
    description:
      "Design tokenek és komponens variánsok importálása közvetlenül a projekt stílus könyvtárába.",
    categoryId: "extensions",
    status: "stable",
    tags: ["design", "storybook", "automatizálás"],
    featured: true,
    action: {
      label: "Dokumentáció",
      href: "https://docs.hswlp.dev/plugins/figma",
      target: "_blank",
    },
  },
  {
    id: "slack-standup",
    name: "Slack standup bot",
    description:
      "Napi státusz gyűjtés Slack csatornákból, automatikus összefoglalóval és action item listával.",
    categoryId: "collaboration",
    status: "stable",
    tags: ["slack", "bot", "összefoglaló"],
    featured: true,
    action: {
      label: "Beállítás megnyitása",
      href: "/settings/integrations#slack-standup",
    },
  },
  {
    id: "jira-bridge",
    name: "Jira bridge",
    description:
      "Projekt szinkron Jira boardokkal, automatizált ticket létrehozás a HSWLP feladatokból.",
    categoryId: "automation",
    status: "beta",
    tags: ["jira", "workflow", "bridge"],
    action: {
      label: "Béta várólista",
    },
  },
  {
    id: "github-release",
    name: "GitHub release pipeline",
    description:
      "Release jegyzet generálás, changelog build és verzió kezelés GitHub Actions-ból.",
    categoryId: "delivery",
    status: "stable",
    tags: ["github", "actions", "release"],
    action: {
      label: "Workflow sablon",
      href: "https://docs.hswlp.dev/plugins/github-release",
      target: "_blank",
    },
  },
  {
    id: "grafana-observability",
    name: "Grafana observability",
    description:
      "Dashboard és alerting integráció a projekt telemetria adatainak monitorozására.",
    categoryId: "analytics",
    status: "soon",
    tags: ["monitoring", "alert", "metrics"],
    action: {
      label: "Értesítést kérek",
    },
  },
  {
    id: "metabase-auto-report",
    name: "Metabase auto riport",
    description:
      "Kijelölt nézetek heti ütemezett PDF exportja és e-mail terjesztése a stakeholdereknek.",
    categoryId: "analytics",
    status: "beta",
    tags: ["riport", "pdf", "automatizálás"],
    action: {
      label: "Béta hozzáférés",
    },
  },
  {
    id: "vercel-preview-sync",
    name: "Vercel preview sync",
    description:
      "Pull request preview URL-ek összegyűjtése és státusz követés a release dashboardon.",
    categoryId: "delivery",
    status: "stable",
    tags: ["vercel", "preview", "release"],
    action: {
      label: "Beállítás megnyitása",
      href: "/settings/integrations#vercel-preview-sync",
    },
  },
  {
    id: "sentry-quality-gates",
    name: "Sentry quality gates",
    description:
      "Release blokkolás magas hibaarány esetén, automatikus rollback javaslattal.",
    categoryId: "delivery",
    status: "soon",
    tags: ["sentry", "quality", "alert"],
    action: {
      label: "Roadmap figyelés",
    },
  },
  {
    id: "storybook-review",
    name: "Storybook review workflow",
    description:
      "Storybook buildek automatikus publikálása, változás követéssel és kommenteléssel.",
    categoryId: "extensions",
    status: "beta",
    tags: ["storybook", "review", "design"],
    action: {
      label: "Béta hozzáférés",
    },
  },
]
