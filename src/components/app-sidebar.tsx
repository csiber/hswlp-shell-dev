"use client"

import { type ComponentType } from "react"
import type { Route } from "next"

import { Settings2, Users } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

export type NavItem = {
  title: string
  url: Route
  icon?: ComponentType
}

export type NavMainItem = NavItem & {
  isActive?: boolean
  items?: NavItem[]
}

const NAV_MAIN_ITEMS: NavMainItem[] = [
  {
    title: "Közösségi feed",
    url: "/",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    isActive: true,
    items: [
      {
        title: "Profile",
        url: "/settings",
      },
      {
        title: "Security",
        url: "/settings/security",
      },
      {
        title: "Sessions",
        url: "/settings/sessions",
      },
      {
        title: "Integrations",
        url: "/settings/integrations",
      },
      {
        title: "Change Password",
        url: "/forgot-password",
      },
    ],
  },
]

// TODO Add a theme switcher
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={NAV_MAIN_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
