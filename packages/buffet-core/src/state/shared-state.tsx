"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type SharedState = Record<string, any>
type SetSharedState = (key: string, value: any) => void

const SharedStateContext = createContext<{
  state: SharedState
  setState: SetSharedState
} | null>(null)

/**
 * Provider for shared state across micro-apps
 */
export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [state, setStateInternal] = useState<SharedState>({})

  const setState = useCallback<SetSharedState>((key, value) => {
    setStateInternal((prev) => ({ ...prev, [key]: value }))

    // Broadcast to other micro-apps
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("buffet:state-change", {
          detail: { key, value },
        }),
      )
    }
  }, [])

  return <SharedStateContext.Provider value={{ state, setState }}>{children}</SharedStateContext.Provider>
}

/**
 * Hook to access shared state across micro-apps
 */
export function useSharedState<T = any>(key: string): [T | undefined, (value: T) => void] {
  const context = useContext(SharedStateContext)

  if (!context) {
    throw new Error("useSharedState must be used within SharedStateProvider")
  }

  const { state, setState } = context

  const setValue = useCallback((value: T) => setState(key, value), [key, setState])

  return [state[key], setValue]
}
