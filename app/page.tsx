import { AppShell } from "@buffet/shared-ui"
import { ArrowRight, Boxes, Zap, Shield, Code, Gauge, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Boxes className="w-4 h-4" />
              Open Source Microfront-end Framework
            </div>
            <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Build Scalable Apps with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Microfront-ends
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground text-balance leading-relaxed">
              Buffet is a delightful microfront-end architecture framework for Next.js. Compose independent applications
              into a unified experience with shared state, routing, and authentication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  View Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/yourusername/buffet" target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_50%,hsl(var(--primary)/0.1),transparent)]" />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Everything you need</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Built with modern best practices and production-ready features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Boxes className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Independent Deployment</CardTitle>
                <CardDescription>
                  Deploy micro-apps independently without affecting others. True team autonomy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Runtime Integration</CardTitle>
                <CardDescription>
                  Compose applications at runtime with lazy loading and intelligent caching.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Unified Authentication</CardTitle>
                <CardDescription>Single sign-on across all applications with shared auth context.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Code className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Shared Design System</CardTitle>
                <CardDescription>Consistent UI/UX with shared components, themes, and utilities.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Gauge className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Performance Optimized</CardTitle>
                <CardDescription>
                  Smart code splitting, lazy loading, and built-in performance monitoring.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Developer Experience</CardTitle>
                <CardDescription>
                  CLI tools, hot reload, TypeScript support, and comprehensive documentation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Simple Architecture</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Host-Remote pattern with shared state and unified routing
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Host Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Main container with navigation, auth, and global state
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Dashboard</h4>
                    <p className="text-xs text-muted-foreground">Analytics & metrics</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Shop</h4>
                    <p className="text-xs text-muted-foreground">E-commerce features</p>
                  </div>
                  <div className="bg-card border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Blog</h4>
                    <p className="text-xs text-muted-foreground">Content management</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Shared Packages</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-background px-3 py-1 rounded-full">Core</span>
                    <span className="bg-background px-3 py-1 rounded-full">UI Components</span>
                    <span className="bg-background px-3 py-1 rounded-full">Utilities</span>
                    <span className="bg-background px-3 py-1 rounded-full">Types</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Apps Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Explore Demo Apps</h2>
            <p className="text-lg text-muted-foreground text-balance">
              See Buffet in action with three fully-functional micro-apps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                <Gauge className="w-16 h-16 text-blue-500" />
              </div>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Analytics dashboard with charts, metrics, and real-time data</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                    View Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-green-500" />
              </div>
              <CardHeader>
                <CardTitle>Shop</CardTitle>
                <CardDescription>E-commerce app with products, cart, and checkout flow</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/shop">
                  <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                    Browse Shop
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                <FileText className="w-16 h-16 text-purple-500" />
              </div>
              <CardHeader>
                <CardTitle>Blog</CardTitle>
                <CardDescription>Content platform with articles, authors, and categories</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/blog">
                  <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                    Read Blog
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Ready to get started?</h2>
            <p className="text-lg mb-8 text-primary-foreground/90 text-balance">
              Clone the repository and start building your microfront-end architecture today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://github.com/yourusername/buffet" target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4 mr-2" />
                  Get Started
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

// Missing import
import { ShoppingBag, FileText } from "lucide-react"
