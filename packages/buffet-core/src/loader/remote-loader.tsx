"use client"

import { lazy, Suspense } from "react"
import type { RemoteAppConfig } from "../types"
import { RemoteAppBoundary } from "../components/remote-app-boundary"

/**
 * Dynamically load a remote application
 */
export function loadRemoteApp(config: RemoteAppConfig) {
  const RemoteComponent = lazy(async () => {
    try {
      // In a real implementation, this would use Module Federation
      // For now, we'll use Next.js dynamic imports
      const module = await import(
        /* webpackIgnore: true */
        `${config.url}${config.module}`
      ).catch(() => {
        // Fallback to local development
        return import(`@/${config.name}/app/page`)
      })

      return { default: module.default || module }
    } catch (error) {
      console.error(`Failed to load remote app: ${config.name}`, error)
      throw error
    }
  })

  return function RemoteAppWrapper(props: any) {
    return (
      <RemoteAppBoundary name={config.name}>
        <Suspense fallback={config.fallback || <RemoteAppLoading />}>
          <RemoteComponent {...props} />
        </Suspense>
      </RemoteAppBoundary>
    )
  }
}

function RemoteAppLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading application...</p>
      </div>
    </div>
  )
}
