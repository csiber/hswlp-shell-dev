import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  PLUGIN_DEFINITIONS,
  type PluginDefinition,
  type PluginStatus,
} from "@/data/plugin-center"

const statusLabels: Record<PluginStatus, string> = {
  stable: "Éles",
  beta: "Nyílt béta",
  soon: "Hamarosan",
}

const statusBadgeStyles: Record<PluginStatus, string> = {
  stable: "border-emerald-200 text-emerald-700 bg-emerald-50",
  beta: "border-amber-200 text-amber-800 bg-amber-50",
  soon: "border-slate-300 text-slate-600 bg-slate-100",
}

const managedIntegrations = PLUGIN_DEFINITIONS.filter(
  (plugin) => plugin.action?.href?.startsWith("/settings/integrations"),
)

const upcomingIntegrations = PLUGIN_DEFINITIONS.filter(
  (plugin) => plugin.status === "soon",
)

export default function IntegrationsSettingsPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Integrációk</h1>
        <p className="text-sm text-muted-foreground">
          Csatlakoztasd a HSWLP fiókodhoz a legfontosabb külső szolgáltatásokat, és kezeld őket egy helyen.
        </p>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Elérhető kapcsolatok</h2>
          <p className="text-sm text-muted-foreground">
            Az alábbi integrációk manuális aktiválást igényelnek. Kattints a kártyákra, hogy megnézd a részleteket a Plugin Centerben.
          </p>
        </div>
        <div className="grid gap-4">
          {managedIntegrations.map((plugin) => (
            <IntegrationCard key={plugin.id} plugin={plugin} />
          ))}

          {managedIntegrations.length === 0 && (
            <Card className="border-dashed border-muted-foreground/40 bg-muted/40">
              <CardHeader>
                <CardTitle>Még nincs aktiválható integráció</CardTitle>
                <CardDescription>
                  Amint elérhetővé válik egy új kapcsolat, itt fog megjelenni.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      {upcomingIntegrations.length > 0 && (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Fejlesztés alatt</h2>
            <p className="text-sm text-muted-foreground">
              Ezek az integrációk hamarosan érkeznek a beállítások közé. A Plugin Centerben feliratkozhatsz a várólistára.
            </p>
          </div>
          <div className="grid gap-3">
            {upcomingIntegrations.map((plugin) => (
              <Card
                key={plugin.id}
                className="border-dashed border-muted-foreground/40 bg-muted/30"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                  <CardDescription>{plugin.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function IntegrationCard({ plugin }: { plugin: PluginDefinition }) {
  return (
    <Card id={plugin.id} className="border-border/70 bg-background">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">{plugin.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {plugin.description}
          </CardDescription>
        </div>
        <Badge variant="outline" className={statusBadgeStyles[plugin.status]}>
          {statusLabels[plugin.status]}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {plugin.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">
            #{tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          A bekötéshez jelenleg manuális jóváhagyás szükséges. Jelezd igényed a Plugin Centeren keresztül.
        </p>
        <Button asChild variant="secondary">
          <Link href={`/plugin-center#${plugin.id}`}>Plugin Center részletek</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
