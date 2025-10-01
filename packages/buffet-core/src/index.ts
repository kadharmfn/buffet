/**
 * @buffet/core
 * Core framework for Buffet microfront-end architecture
 */

export { loadRemoteApp } from "./loader/remote-loader"
export { useSharedState, SharedStateProvider } from "./state/shared-state"
export { useBuffetRouter, BuffetRouterProvider } from "./router/buffet-router"
export { useAuth, AuthProvider } from "./auth/auth-provider"
export { RemoteAppBoundary } from "./components/remote-app-boundary"
export { HealthCheck } from "./monitoring/health-check"
export { PerformanceMonitor } from "./monitoring/performance-monitor"

export type {
  RemoteAppConfig,
  BuffetConfig,
  SharedStateConfig,
  AuthConfig,
  HealthStatus,
} from "./types"
