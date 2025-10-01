"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  bundleSize: number
  memoryUsage: number
}

/**
 * Performance monitoring for micro-apps
 */
export function PerformanceMonitor({ appName }: { appName: string }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window === "undefined") return

      const navigation = performance.getEntriesByType("navigation")[0] as any
      const memory = (performance as any).memory

      setMetrics({
        loadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
        renderTime: navigation?.domContentLoadedEventEnd - navigation?.fetchStart || 0,
        bundleSize: navigation?.transferSize || 0,
        memoryUsage: memory?.usedJSHeapSize || 0,
      })
    }

    measurePerformance()

    // Report metrics
    window.dispatchEvent(
      new CustomEvent("buffet:performance", {
        detail: { appName, metrics },
      }),
    )
  }, [appName])

  if (!metrics) return null

  return (
    <div className="text-xs text-muted-foreground space-y-1">
      <div>Load: {(metrics.loadTime / 1000).toFixed(2)}s</div>
      <div>Render: {(metrics.renderTime / 1000).toFixed(2)}s</div>
      <div>Bundle: {(metrics.bundleSize / 1024).toFixed(0)}KB</div>
      <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(0)}MB</div>
    </div>
  )
}
