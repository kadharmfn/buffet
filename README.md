# 🍽️ Buffet - Modern Microfront-end Architecture

<div align="center">
  <img src="/public/buffet-logo.jpg" alt="Buffet Logo" width="200" />
  <p><strong>A delightful microfront-end architecture framework for Next.js</strong></p>
  <p>Serve multiple independent applications together, harmoniously.</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
</div>

---

## 🎯 What is Buffet?

Buffet is a production-ready microfront-end architecture framework that enables you to build, deploy, and compose multiple independent Next.js applications into a unified user experience. Like a buffet offers variety and choice, this framework lets you serve different applications together seamlessly.

### Key Features

- 🏗️ **Independent Deployment** - Deploy micro-apps independently without affecting others
- 🔄 **Runtime Integration** - Compose applications at runtime, not build time
- 🎨 **Shared Design System** - Consistent UI/UX across all micro-apps
- 🔐 **Unified Authentication** - Single sign-on across all applications
- 📦 **Smart Code Sharing** - Share common dependencies efficiently
- 🚀 **Performance Optimized** - Lazy loading and intelligent caching
- 🛠️ **Developer Experience** - CLI tools and hot module replacement
- 📊 **Built-in Monitoring** - Track performance and errors across apps

---

## 🏛️ Architecture Overview

Buffet uses a **Host-Remote** pattern where:

- **Host Application** (Shell) - The main container that orchestrates micro-apps
- **Remote Applications** - Independent micro-apps that can be loaded dynamically
- **Shared Libraries** - Common utilities, components, and configurations

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Host Application                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Navigation & Layout Shell              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Remote 1   │  │   Remote 2   │  │   Remote 3   │ │
│  │  Dashboard   │  │     Shop     │  │     Blog     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Shared: Auth, UI, Utils, State          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Basic knowledge of Next.js and React

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/buffet.git
cd buffet

# Install dependencies
npm install

# Start all applications in development mode
npm run dev

# Or start individual apps
npm run dev:host      # Host application (port 3000)
npm run dev:dashboard # Dashboard remote (port 3001)
npm run dev:shop      # Shop remote (port 3002)
npm run dev:blog      # Blog remote (port 3003)
\`\`\`

### Project Structure

\`\`\`
buffet/
├── apps/
│   ├── host/              # Main host application
│   ├── dashboard/         # Dashboard micro-app
│   ├── shop/              # E-commerce micro-app
│   └── blog/              # Blog micro-app
├── packages/
│   ├── shared-ui/         # Shared component library
│   ├── shared-utils/      # Common utilities
│   ├── shared-types/      # TypeScript definitions
│   └── buffet-core/       # Core framework logic
├── docs/                  # Documentation
├── examples/              # Example implementations
└── tools/                 # CLI and dev tools
\`\`\`

---

## 📚 Core Concepts

### 1. Dynamic Remote Loading

Buffet uses Next.js dynamic imports to load remote applications on-demand:

\`\`\`typescript
import { loadRemoteApp } from '@buffet/core'

const DashboardApp = loadRemoteApp({
  name: 'dashboard',
  url: process.env.DASHBOARD_URL,
  fallback: <LoadingSpinner />
})
\`\`\`

### 2. Shared State Management

Use the built-in state bridge to share data between micro-apps:

\`\`\`typescript
import { useSharedState } from '@buffet/core'

function MyComponent() {
  const [user, setUser] = useSharedState('user')
  return <div>Welcome, {user.name}</div>
}
\`\`\`

### 3. Cross-App Navigation

Navigate between micro-apps seamlessly:

\`\`\`typescript
import { useBuffetRouter } from '@buffet/core'

function Navigation() {
  const router = useBuffetRouter()
  
  return (
    <nav>
      <button onClick={() => router.push('/dashboard')}>Dashboard</button>
      <button onClick={() => router.push('/shop')}>Shop</button>
    </nav>
  )
}
\`\`\`

### 4. Shared Authentication

Single authentication context across all apps:

\`\`\`typescript
import { useAuth } from '@buffet/core'

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) return <LoginPage />
  return children
}
\`\`\`

---

## 🎨 Design System

Buffet includes a comprehensive design system built with:

- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible primitives
- **Lucide Icons** - Beautiful icon set

All micro-apps share the same design tokens for consistency.

---

## 🔧 Configuration

### Host Configuration

\`\`\`typescript
// apps/host/buffet.config.ts
export default {
  remotes: {
    dashboard: {
      url: process.env.NEXT_PUBLIC_DASHBOARD_URL,
      scope: 'dashboard',
      module: './App'
    },
    shop: {
      url: process.env.NEXT_PUBLIC_SHOP_URL,
      scope: 'shop',
      module: './App'
    }
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
}
\`\`\`

### Remote Configuration

\`\`\`typescript
// apps/dashboard/buffet.config.ts
export default {
  name: 'dashboard',
  exposes: {
    './App': './src/app/page.tsx',
    './Navigation': './src/components/navigation.tsx'
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
}
\`\`\`

---

## 🛠️ CLI Commands

\`\`\`bash
# Create a new micro-app
npx buffet create my-app

# Add a remote to host
npx buffet add-remote dashboard --url http://localhost:3001

# Build all applications
npm run build

# Build specific app
npm run build:dashboard

# Run tests
npm test

# Lint all apps
npm run lint
\`\`\`

---

## 📊 Monitoring & Debugging

Buffet includes built-in tools for monitoring:

- **Performance Metrics** - Track load times and bundle sizes
- **Error Boundaries** - Isolate failures to specific micro-apps
- **Dev Tools** - Browser extension for debugging
- **Health Checks** - Monitor remote app availability

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

\`\`\`bash
# Deploy host application
cd apps/host
vercel deploy --prod

# Deploy remote applications
cd apps/dashboard
vercel deploy --prod
\`\`\`

### Environment Variables

\`\`\`env
# Host Application
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.example.com
NEXT_PUBLIC_SHOP_URL=https://shop.example.com
NEXT_PUBLIC_BLOG_URL=https://blog.example.com

# Shared
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

---

## 🧪 Testing

\`\`\`bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test specific app
npm run test:dashboard
\`\`\`

---

## 📖 Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [Architecture Deep Dive](./docs/architecture.md)
- [API Reference](./docs/api-reference.md)
- [Best Practices](./docs/best-practices.md)
- [Migration Guide](./docs/migration.md)
- [Troubleshooting](./docs/troubleshooting.md)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- The micro-frontend community for inspiration
- All contributors who make this project possible

---

## 🔗 Links

- [Documentation](https://buffet-docs.example.com)
- [Demo](https://buffet-demo.example.com)
- [GitHub](https://github.com/yourusername/buffet)
- [Discord Community](https://discord.gg/buffet)
- [Twitter](https://twitter.com/buffet_mfe)

---

<div align="center">
  <p>Made with ❤️ by the Buffet team</p>
  <p>⭐ Star us on GitHub if you find this useful!</p>
</div>
