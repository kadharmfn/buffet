# Buffet Architecture

This document provides a deep dive into Buffet's microfront-end architecture.

## Overview

Buffet implements a **Host-Remote** pattern where independent applications are composed at runtime. This enables:

- Independent development and deployment
- Technology flexibility
- Team autonomy
- Scalable architecture

## Core Concepts

### 1. Host Application

The host is the main container that:
- Provides the shell (navigation, layout)
- Manages authentication
- Orchestrates remote loading
- Handles routing
- Shares global state

**Location**: `apps/host/`

### 2. Remote Applications

Remote apps are independent micro-frontends that:
- Can be developed separately
- Have their own dependencies
- Deploy independently
- Expose specific modules

**Locations**: `apps/dashboard/`, `apps/shop/`, `apps/blog/`

### 3. Shared Packages

Common code shared across all apps:

- **@buffet/core**: Framework logic (loading, state, routing)
- **@buffet/shared-ui**: UI components
- **@buffet/shared-utils**: Utilities
- **@buffet/shared-types**: TypeScript types

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Browser Window                        │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           Host Application (Shell)              │    │
│  │  ┌──────────────────────────────────────────┐  │    │
│  │  │  Navigation, Auth, Global State          │  │    │
│  │  └──────────────────────────────────────────┘  │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────────┐  │    │
│  │  │         Dynamic Content Area             │  │    │
│  │  │                                          │  │    │
│  │  │  ┌────────────────────────────────────┐ │  │    │
│  │  │  │  Remote App (Lazy Loaded)          │ │  │    │
│  │  │  │  - Dashboard                       │ │  │    │
│  │  │  │  - Shop                            │ │  │    │
│  │  │  │  - Blog                            │ │  │    │
│  │  │  └────────────────────────────────────┘ │  │    │
│  │  └──────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

         ↓ Uses                    ↓ Uses
         
┌──────────────────┐      ┌──────────────────┐
│  Shared Packages │      │  Remote Servers  │
│  - Core          │      │  - Dashboard     │
│  - UI            │      │  - Shop          │
│  - Utils         │      │  - Blog          │
│  - Types         │      │                  │
└──────────────────┘      └──────────────────┘
\`\`\`

## Communication Patterns

### 1. Shared State

Apps communicate via shared state:

\`\`\`typescript
// In any micro-app
import { useSharedState } from '@buffet/core'

function MyComponent() {
  const [cart, setCart] = useSharedState('cart')
  
  return <div>Items: {cart.length}</div>
}
\`\`\`

**Implementation**: Custom events + React Context

### 2. Cross-App Navigation

Navigate between micro-apps:

\`\`\`typescript
import { useBuffetRouter } from '@buffet/core'

function Navigation() {
  const router = useBuffetRouter()
  
  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  )
}
\`\`\`

**Implementation**: Next.js router + event broadcasting

### 3. Authentication

Single authentication context:

\`\`\`typescript
import { useAuth } from '@buffet/core'

function ProtectedPage() {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) return <LoginPage />
  return <Dashboard user={user} />
}
\`\`\`

**Implementation**: Shared auth provider + localStorage

## Loading Strategy

### 1. Initial Load

1. Host application loads
2. Shell renders (navigation, layout)
3. Route determines which remote to load
4. Remote app loads asynchronously

### 2. Lazy Loading

Remote apps use React.lazy:

\`\`\`typescript
const DashboardApp = lazy(() => 
  import('dashboard/App')
)
\`\`\`

### 3. Error Boundaries

Each remote has an error boundary:

\`\`\`typescript
<RemoteAppBoundary name="dashboard">
  <Suspense fallback={<Loading />}>
    <DashboardApp />
  </Suspense>
</RemoteAppBoundary>
\`\`\`

## Dependency Management

### Shared Dependencies

Common dependencies are shared:

\`\`\`typescript
{
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    next: { singleton: true }
  }
}
\`\`\`

### Version Conflicts

Buffet handles version conflicts by:
1. Using singleton pattern for critical deps
2. Allowing multiple versions for non-critical deps
3. Warning on version mismatches

## Performance Optimization

### 1. Code Splitting

Each micro-app is a separate bundle:
- Reduces initial load time
- Enables parallel loading
- Improves caching

### 2. Caching Strategy

\`\`\`
Host App (cached long-term)
  ↓
Remote Manifests (cached short-term)
  ↓
Remote Bundles (cached with hash)
\`\`\`

### 3. Preloading

Critical remotes can be preloaded:

\`\`\`typescript
<link rel="preload" href="dashboard/app.js" as="script" />
\`\`\`

## Deployment Architecture

### Development

\`\`\`
localhost:3000 (Host)
  ↓ loads from
localhost:3001 (Dashboard)
localhost:3002 (Shop)
localhost:3003 (Blog)
\`\`\`

### Production

\`\`\`
app.example.com (Host)
  ↓ loads from
dashboard.example.com
shop.example.com
blog.example.com
\`\`\`

Each can be deployed independently to Vercel, AWS, etc.

## Security Considerations

### 1. CORS

Remote apps must allow host origin:

\`\`\`typescript
// next.config.js
headers: [
  {
    source: '/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: 'https://app.example.com' }
    ]
  }
]
\`\`\`

### 2. Content Security Policy

\`\`\`typescript
Content-Security-Policy: 
  script-src 'self' dashboard.example.com shop.example.com;
\`\`\`

### 3. Authentication

- Tokens shared via secure cookies
- HTTPS only in production
- Token refresh handled by host

## Monitoring

### 1. Health Checks

Each remote exposes `/health`:

\`\`\`typescript
// app/health/route.ts
export async function GET() {
  return Response.json({ status: 'healthy' })
}
\`\`\`

### 2. Performance Metrics

Track:
- Load times
- Bundle sizes
- Error rates
- User interactions

### 3. Error Tracking

Errors are isolated and reported:

\`\`\`typescript
window.addEventListener('buffet:remote-error', (e) => {
  // Send to monitoring service
  console.error('Remote error:', e.detail)
})
\`\`\`

## Best Practices

1. **Keep remotes independent**: Minimize cross-dependencies
2. **Use shared packages**: For truly common code
3. **Version carefully**: Use semantic versioning
4. **Test integration**: E2E tests across apps
5. **Monitor performance**: Track load times
6. **Handle failures**: Graceful degradation
7. **Document APIs**: Clear contracts between apps

## Further Reading

- [Getting Started Guide](./getting-started.md)
- [API Reference](./api-reference.md)
- [Best Practices](./best-practices.md)
- [Troubleshooting](./troubleshooting.md)
\`\`\`
