# Best Practices

Guidelines for building robust microfront-end applications with Buffet.

## Architecture

### Keep Remotes Independent

**Do:**
\`\`\`typescript
// Remote app has its own state
const [data, setData] = useState([])
\`\`\`

**Don't:**
\`\`\`typescript
// Don't directly import from other remotes
import { SomeComponent } from '../../shop/components'
\`\`\`

### Use Shared Packages Wisely

**Do:**
- UI components used everywhere
- Common utilities
- Type definitions
- Business logic used by multiple apps

**Don't:**
- App-specific components
- One-off utilities
- Experimental code

## Communication

### Shared State

**Do:**
\`\`\`typescript
// Use for truly global state
const [user, setUser] = useSharedState('user')
const [theme, setTheme] = useSharedState('theme')
\`\`\`

**Don't:**
\`\`\`typescript
// Don't use for app-specific state
const [dashboardFilters, setFilters] = useSharedState('dashboardFilters')
\`\`\`

### Events

**Do:**
\`\`\`typescript
// Emit meaningful events
window.dispatchEvent(new CustomEvent('cart:updated', {
  detail: { items: cart }
}))
\`\`\`

**Don't:**
\`\`\`typescript
// Don't create event spaghetti
window.dispatchEvent(new CustomEvent('random:event'))
\`\`\`

## Performance

### Code Splitting

**Do:**
\`\`\`typescript
// Lazy load heavy components
const HeavyChart = lazy(() => import('./heavy-chart'))
\`\`\`

**Don't:**
\`\`\`typescript
// Don't import everything upfront
import { Everything } from 'heavy-library'
\`\`\`

### Bundle Size

- Monitor bundle sizes
- Use dynamic imports
- Tree-shake unused code
- Optimize images

### Caching

\`\`\`typescript
// Cache remote manifests
const manifest = await fetch('/manifest.json', {
  cache: 'force-cache'
})
\`\`\`

## Error Handling

### Graceful Degradation

**Do:**
\`\`\`typescript
<RemoteAppBoundary name="dashboard">
  <Suspense fallback={<Loading />}>
    <DashboardApp />
  </Suspense>
</RemoteAppBoundary>
\`\`\`

**Don't:**
\`\`\`typescript
// Don't let one app crash everything
<DashboardApp /> // No error boundary
\`\`\`

### User Feedback

\`\`\`typescript
if (error) {
  return (
    <div>
      <p>Dashboard is temporarily unavailable</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )
}
\`\`\`

## Testing

### Unit Tests

Test components in isolation:

\`\`\`typescript
describe('ProductCard', () => {
  it('renders product info', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Product Name')).toBeInTheDocument()
  })
})
\`\`\`

### Integration Tests

Test cross-app interactions:

\`\`\`typescript
describe('Cart Integration', () => {
  it('updates cart across apps', async () => {
    // Add item in shop
    await addToCart(product)
    
    // Verify in cart widget
    expect(getCartCount()).toBe(1)
  })
})
\`\`\`

### E2E Tests

Test complete user flows:

\`\`\`typescript
test('complete purchase flow', async ({ page }) => {
  await page.goto('/shop')
  await page.click('[data-testid="add-to-cart"]')
  await page.goto('/checkout')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('[data-testid="complete-order"]')
  expect(page.url()).toContain('/success')
})
\`\`\`

## Deployment

### Environment Variables

\`\`\`env
# Use different URLs per environment
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.prod.example.com
\`\`\`

### Versioning

Use semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Rollback Strategy

1. Keep previous version deployed
2. Use feature flags
3. Monitor error rates
4. Quick rollback if needed

## Security

### Authentication

\`\`\`typescript
// Validate tokens on every request
const token = getAuthToken()
if (!isValidToken(token)) {
  redirectToLogin()
}
\`\`\`

### CORS

\`\`\`typescript
// Whitelist specific origins
const allowedOrigins = [
  'https://app.example.com',
  'https://staging.example.com'
]
\`\`\`

### Content Security Policy

\`\`\`typescript
headers: {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' trusted-cdn.com"
}
\`\`\`

## Monitoring

### Key Metrics

Track:
- Load time per remote
- Error rate per remote
- User interactions
- Bundle sizes
- API response times

### Alerts

Set up alerts for:
- Remote app down
- High error rate
- Slow load times
- Failed deployments

### Logging

\`\`\`typescript
console.log('[Buffet]', {
  app: 'dashboard',
  action: 'loaded',
  duration: loadTime
})
\`\`\`

## Documentation

### Code Comments

\`\`\`typescript
/**
 * Loads a remote application dynamically
 * @param config - Remote app configuration
 * @returns React component
 */
export function loadRemoteApp(config: RemoteAppConfig) {
  // ...
}
\`\`\`

### API Contracts

Document shared interfaces:

\`\`\`typescript
/**
 * User object shared across all apps
 */
export interface User {
  id: string
  email: string
  name: string
}
\`\`\`

### Change Logs

Maintain CHANGELOG.md:

\`\`\`markdown
## [1.2.0] - 2025-01-15
### Added
- New shop micro-app
### Changed
- Updated authentication flow
### Fixed
- Cart sync issue
\`\`\`

## Team Collaboration

### Code Reviews

- Review cross-app impacts
- Check bundle size changes
- Verify error handling
- Test integration points

### Communication

- Document breaking changes
- Announce deployments
- Share performance metrics
- Coordinate releases

### Ownership

- Clear ownership per micro-app
- Shared ownership of core packages
- Designated reviewers
- On-call rotation

## Conclusion

Following these best practices will help you build maintainable, performant, and scalable microfront-end applications with Buffet.

For more information, see:
- [Architecture Guide](./architecture.md)
- [API Reference](./api-reference.md)
- [Troubleshooting](./troubleshooting.md)
\`\`\`
