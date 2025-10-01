"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface BuffetRouterContext {
  push: (path: string) => void
  replace: (path: string) => void
  back: () => void
  pathname: string
}

const RouterContext = createContext<BuffetRouterContext | null>(null)

/**
 * Router provider for cross-app navigation
 */
export function BuffetRouterProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const push = (path: string) => {
    router.push(path)

    // Notify other micro-apps
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("buffet:navigation", {
          detail: { path, type: "push" },
        }),
      )
    }
  }

  const replace = (path: string) => {
    router.replace(path)

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("buffet:navigation", {
          detail: { path, type: "replace" },
        }),
      )
    }
  }

  const back = () => {
    router.back()
  }

  return <RouterContext.Provider value={{ push, replace, back, pathname }}>{children}</RouterContext.Provider>
}

/**
 * Hook for cross-app navigation
 */
export function useBuffetRouter() {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error("useBuffetRouter must be used within BuffetRouterProvider")
  }

  return context
}
