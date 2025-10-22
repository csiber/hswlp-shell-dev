"use client"

import { useMemo } from "react"
import { LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import useSignOut from "@/hooks/useSignOut"
import { useSessionStore } from "@/state/session"

interface UserMenuProps {
  variant?: "desktop" | "mobile"
  onNavigate?: () => void
}

export function UserMenu({ variant = "desktop", onNavigate }: UserMenuProps) {
  const { session, isLoading } = useSessionStore()
  const { signOut } = useSignOut()
  const router = useRouter()

  const user = session?.user

  const displayName = useMemo(() => {
    if (!user) return null
    if (user.nickname) return user.nickname
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    if (user.firstName) return user.firstName
    if (user.lastName) return user.lastName
    return user.email ?? "Builder"
  }, [user])

  const initials = useMemo(() => {
    if (!user) return "U"
    if (user.initials) return user.initials
    if (displayName) {
      const letters = displayName
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
      if (letters) {
        return letters.toUpperCase()
      }
    }
    if (user.email) return user.email[0]?.toUpperCase() ?? "U"
    return "U"
  }, [displayName, user])

  const handleSettings = () => {
    onNavigate?.()
    router.push("/settings")
  }

  const handleSignOut = () => {
    onNavigate?.()
    void (async () => {
      await signOut()
      router.push("/")
    })()
  }

  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          "h-10",
          variant === "mobile" ? "w-full" : "w-[112px]"
        )}
      />
    )
  }

  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === "desktop" ? "ghost" : "outline"}
          className={cn(
            "h-10 gap-3 px-2",
            variant === "mobile" ? "w-full justify-between" : "justify-start"
          )}
        >
          <span className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar ?? undefined} alt={displayName ?? "User avatar"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{displayName}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium leading-none">{displayName}</span>
            {user.email ? (
              <span className="text-xs text-muted-foreground leading-none">{user.email}</span>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
