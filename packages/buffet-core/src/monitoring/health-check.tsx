"use client"

import { useState, useEffect } from "react"
import type { HealthStatus } from "../types"

/**
 * Health check component for monitoring remote apps
 */
export function HealthCheck({ remotes }: { remotes: string[] }) {
  const [statuses, setStatuses] = useState<Record<string, HealthStatus>>({})

  useEffect(() => {
    const checkHealth = async () => {
      const results: Record<string, HealthStatus> = {}

      for (const remote of remotes) {
        const startTime = Date.now()
        try {
          // In production, this would ping the remote app's health endpoint
          const response = await fetch(`${remote}/health`, {
            method: "HEAD",
            cache: "no-store",
          }).catch(() => null)

          const latency = Date.now() - startTime

          results[remote] = {
            name: remote,
            status: response?.ok ? "healthy" : "down",
            latency,
            lastCheck: new Date(),
          }
        } catch (error) {
          results[remote] = {
            name: remote,
            status: "down",
            latency: Date.now() - startTime,
            lastCheck: new Date(),
            error: error instanceof Error ? error.message : "Unknown error",
          }
        }
      }

      setStatuses(results)
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30s

    return () => clearInterval(interval)
  }, [remotes])

  return (
    <div className="space-y-2">
      {Object.values(statuses).map((status) => (
        <div key={status.name} className="flex items-center justify-between p-3 bg-card rounded-lg border">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                status.status === "healthy"
                  ? "bg-green-500"
                  : status.status === "degraded"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <span className="font-medium">{status.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{status.latency}ms</span>
        </div>
      ))}
    </div>
  )
}
