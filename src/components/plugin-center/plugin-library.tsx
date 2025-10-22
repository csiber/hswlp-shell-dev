"use client"

import { useMemo, useState } from "react"

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
import { cn } from "@/lib/utils"
import {
  PLUGIN_CATEGORIES,
  type PluginCategoryId,
  type PluginDefinition,
  type PluginStatus,
} from "@/data/plugin-center"

const statusStyles: Record<PluginStatus, string> = {
  stable: "bg-emerald-100 text-emerald-700 border-emerald-200",
  beta: "bg-amber-100 text-amber-800 border-amber-200",
  soon: "bg-slate-100 text-slate-600 border-slate-200",
}

const statusLabels: Record<PluginStatus, string> = {
  stable: "Éles",
  beta: "Nyílt béta",
  soon: "Hamarosan",
}

const categoryLabelMap = Object.fromEntries(
  PLUGIN_CATEGORIES.map((category) => [category.id, category.label])
) as Record<PluginCategoryId, string>

const filterOptions: { id: "all" | PluginCategoryId; label: string }[] = [
  { id: "all", label: "Összes" },
  ...PLUGIN_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
  })),
]

export function PluginLibrary({ plugins }: { plugins: PluginDefinition[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | PluginCategoryId>("all")

  const filteredPlugins = useMemo(() => {
    if (activeFilter === "all") {
      return plugins
    }

    return plugins.filter((plugin) => plugin.categoryId === activeFilter)
  }, [activeFilter, plugins])

  const filterInfo = useMemo(() => {
    if (activeFilter === "all") {
      return "a teljes integrációs ökoszisztémában"
    }

    return `a ${categoryLabelMap[activeFilter].toLowerCase()} fókuszterületén`
  }, [activeFilter])

  const pluginWord = filteredPlugins.length === 1 ? "bővítmény" : "bővítmények"

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Plugin könyvtár</h2>
          <p className="text-sm text-muted-foreground">
            {filteredPlugins.length} {pluginWord} aktívan beköthető {filterInfo}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeFilter === option.id ? "default" : "outline"}
              onClick={() => setActiveFilter(option.id)}
              className={cn(
                "h-9 rounded-full border-muted-foreground/10 px-4 text-sm transition",
                activeFilter === option.id
                  ? "shadow-lg shadow-primary/20"
                  : "hover:border-primary/40"
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlugins.map((plugin) => (
          <Card key={plugin.id} className="flex h-full flex-col justify-between border-border/70">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="outline"
                  className={cn("border", statusStyles[plugin.status])}
                >
                  {statusLabels[plugin.status]}
                </Badge>
                <span className="text-sm font-medium text-muted-foreground">
                  {categoryLabelMap[plugin.categoryId]}
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold leading-tight">
                  {plugin.name}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {plugin.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {plugin.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  #{tag}
                </Badge>
              ))}
            </CardContent>
            {plugin.action && (
              <CardFooter className="mt-auto flex items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                  {plugin.status === "soon"
                    ? "Feliratkozás várólistára"
                    : plugin.status === "beta"
                      ? "Korai hozzáférés"
                      : "Azonnal telepíthető"}
                </div>
                {plugin.action.href ? (
                  <Button
                    asChild
                    variant="secondary"
                    className="group rounded-full"
                  >
                    <a
                      href={plugin.action.href}
                      target={plugin.action.target}
                      rel={
                        plugin.action.target === "_blank" ? "noreferrer" : undefined
                      }
                    >
                      {plugin.action.label}
                    </a>
                  </Button>
                ) : (
                  <Button variant="ghost" className="rounded-full" disabled>
                    {plugin.action.label}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="rounded-xl border border-dashed border-muted-foreground/40 bg-muted/40 p-8 text-center">
          <h3 className="text-lg font-semibold">Nincs még elérhető plugin ebben a kategóriában</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Javasolj új integrációt a Discord közösségben, vagy kérj privát demót.
          </p>
        </div>
      )}
    </section>
  )
}
