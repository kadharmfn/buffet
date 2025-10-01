/**
 * Buffet Configuration
 * Central configuration for the microfront-end architecture
 */

import type { BuffetConfig } from "./packages/buffet-core/src/types"

const config: BuffetConfig = {
  remotes: {
    dashboard: {
      name: "dashboard",
      url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
      scope: "dashboard",
      module: "./App",
      timeout: 5000,
      retries: 3,
    },
    shop: {
      name: "shop",
      url: process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3002",
      scope: "shop",
      module: "./App",
      timeout: 5000,
      retries: 3,
    },
    blog: {
      name: "blog",
      url: process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3003",
      scope: "blog",
      module: "./App",
      timeout: 5000,
      retries: 3,
    },
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: "^18.0.0",
    },
    "react-dom": {
      singleton: true,
      requiredVersion: "^18.0.0",
    },
    next: {
      singleton: true,
      requiredVersion: "^15.0.0",
    },
  },
  monitoring: {
    enabled: true,
    sampleRate: 1.0,
  },
  auth: {
    provider: "custom",
    sessionTimeout: 3600000, // 1 hour
  },
}

export default config
