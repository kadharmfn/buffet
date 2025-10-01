import fs from "fs"
import path from "path"

interface CreateOptions {
  template: string
  port: string
}

export async function createApp(name: string, options: CreateOptions) {
  console.log(`Creating new micro-app: ${name}`)
  console.log(`Template: ${options.template}`)
  console.log(`Port: ${options.port}`)

  const appDir = path.join(process.cwd(), "apps", name)

  // Check if directory exists
  if (fs.existsSync(appDir)) {
    console.error(`Error: Directory apps/${name} already exists`)
    process.exit(1)
  }

  // Create directory
  fs.mkdirSync(appDir, { recursive: true })

  // Create package.json
  const packageJson = {
    name,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: `next dev -p ${options.port}`,
      build: "next build",
      start: `next start -p ${options.port}`,
      lint: "next lint",
      typecheck: "tsc --noEmit",
    },
    dependencies: {
      next: "15.5.4",
      react: "19.1.1",
      "react-dom": "19.1.1",
      "@buffet/core": "workspace:*",
      "@buffet/shared-ui": "workspace:*",
      "@buffet/shared-utils": "workspace:*",
      "@buffet/shared-types": "workspace:*",
      "lucide-react": "^0.460.0",
    },
    devDependencies: {
      "@types/node": "^22.0.0",
      "@types/react": "^18.3.0",
      "@types/react-dom": "^18.3.0",
      typescript: "^5.6.0",
    },
  }

  fs.writeFileSync(path.join(appDir, "package.json"), JSON.stringify(packageJson, null, 2))

  // Create app directory structure
  const appSubDir = path.join(appDir, "app")
  fs.mkdirSync(appSubDir, { recursive: true })

  // Create page.tsx based on template
  const pageContent = getTemplateContent(options.template, name)
  fs.writeFileSync(path.join(appSubDir, "page.tsx"), pageContent)

  // Create tsconfig.json
  const tsConfig = {
    extends: "../../tsconfig.json",
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@/*": ["./*"],
        "@buffet/core": ["../../packages/buffet-core/src"],
        "@buffet/shared-ui": ["../../packages/shared-ui/src"],
        "@buffet/shared-utils": ["../../packages/shared-utils/src"],
        "@buffet/shared-types": ["../../packages/shared-types/src"],
      },
    },
    include: ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  }

  fs.writeFileSync(path.join(appDir, "tsconfig.json"), JSON.stringify(tsConfig, null, 2))

  // Create next.config.mjs
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@buffet/core", "@buffet/shared-ui", "@buffet/shared-utils", "@buffet/shared-types"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
`

  fs.writeFileSync(path.join(appDir, "next.config.mjs"), nextConfig)

  console.log(`\nSuccess! Created ${name} at apps/${name}`)
  console.log("\nNext steps:")
  console.log(`  1. cd apps/${name}`)
  console.log(`  2. npm install`)
  console.log(`  3. npm run dev`)
  console.log(`\nOr run all apps: npm run dev`)
}

function getTemplateContent(template: string, name: string): string {
  const templates: Record<string, string> = {
    basic: `import { AppShell } from "@buffet/shared-ui"

export default function ${capitalize(name)}Page() {
  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-4">${capitalize(name)}</h1>
        <p className="text-muted-foreground">
          Welcome to your new micro-app!
        </p>
      </div>
    </AppShell>
  )
}
`,
    dashboard: `"use client"

import { AppShell } from "@buffet/shared-ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign } from 'lucide-react'

export default function ${capitalize(name)}Page() {
  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">${capitalize(name)}</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
`,
    shop: `"use client"

import { AppShell } from "@buffet/shared-ui"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'

const products = [
  { id: 1, name: "Product 1", price: 99.99 },
  { id: 2, name: "Product 2", price: 149.99 },
  { id: 3, name: "Product 3", price: 79.99 },
]

export default function ${capitalize(name)}Page() {
  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">${capitalize(name)}</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$\{product.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
`,
  }

  return templates[template] || templates.basic
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
