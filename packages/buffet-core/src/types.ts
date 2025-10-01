import type React from "react"
/**
 * Core type definitions for Buffet
 */

export interface RemoteAppConfig {
  name: string
  url: string
  scope: string
  module: string
  fallback?: React.ReactNode
  timeout?: number
  retries?: number
}

export interface BuffetConfig {
  remotes: Record<string, RemoteAppConfig>
  shared?: Record<string, SharedDependencyConfig>
  monitoring?: MonitoringConfig
  auth?: AuthConfig
}

export interface SharedDependencyConfig {
  singleton?: boolean
  requiredVersion?: string
  eager?: boolean
}

export interface MonitoringConfig {
  enabled: boolean
  endpoint?: string
  sampleRate?: number
}

export interface AuthConfig {
  provider: "supabase" | "auth0" | "custom"
  redirectUrl?: string
  sessionTimeout?: number
}

export interface HealthStatus {
  name: string
  status: "healthy" | "degraded" | "down"
  latency: number
  lastCheck: Date
  error?: string
}

export interface RemoteAppMetadata {
  name: string
  version: string
  buildTime: string
  dependencies: Record<string, string>
}

export interface LoadRemoteOptions {
  config: RemoteAppConfig
  onLoad?: () => void
  onError?: (error: Error) => void
}
