# CLI Reference

The Buffet CLI provides commands to manage your microfront-end architecture.

## Installation

The CLI is included in the Buffet monorepo. To use it globally:

\`\`\`bash
npm install -g @buffet/cli
\`\`\`

Or use it directly with npx:

\`\`\`bash
npx buffet <command>
\`\`\`

## Commands

### create

Create a new micro-app.

\`\`\`bash
buffet create <name> [options]
\`\`\`

**Arguments:**
- `name` - Name of the micro-app

**Options:**
- `-t, --template <template>` - Template to use (basic, dashboard, shop). Default: basic
- `-p, --port <port>` - Development port. Default: 3000

**Examples:**

\`\`\`bash
# Create a basic app
buffet create my-app

# Create a dashboard app on port 3004
buffet create analytics --template dashboard --port 3004

# Create a shop app
buffet create store --template shop --port 3005
\`\`\`

### add-remote

Add a remote app to the host configuration.

\`\`\`bash
buffet add-remote <name> --url <url> [options]
\`\`\`

**Arguments:**
- `name` - Name of the remote app

**Options:**
- `-u, --url <url>` - Remote app URL (required)
- `-s, --scope <scope>` - Module scope. Default: app
- `-m, --module <module>` - Module path. Default: ./App

**Examples:**

\`\`\`bash
# Add a remote app
buffet add-remote analytics --url http://localhost:3004

# Add with custom scope and module
buffet add-remote store --url http://localhost:3005 --scope shop --module ./Store
\`\`\`

### dev

Start applications in development mode.

\`\`\`bash
buffet dev [options]
\`\`\`

**Options:**
- `-a, --app <app>` - Start specific app only

**Examples:**

\`\`\`bash
# Start all apps
buffet dev

# Start only the host
buffet dev --app host

# Start only the dashboard
buffet dev --app dashboard
\`\`\`

### build

Build applications for production.

\`\`\`bash
buffet build [options]
\`\`\`

**Options:**
- `-a, --app <app>` - Build specific app only

**Examples:**

\`\`\`bash
# Build all apps
buffet build

# Build only the host
buffet build --app host

# Build only the shop
buffet build --app shop
\`\`\`

## Configuration

The CLI reads from `buffet.config.ts` in the project root. This file defines:

- Remote applications
- Shared dependencies
- Monitoring settings
- Authentication configuration

Example configuration:

\`\`\`typescript
import type { BuffetConfig } from "@buffet/core"

const config: BuffetConfig = {
  remotes: {
    dashboard: {
      name: "dashboard",
      url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
      scope: "dashboard",
      module: "./App",
    },
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
}

export default config
\`\`\`

## Environment Variables

The CLI respects the following environment variables:

- `NEXT_PUBLIC_<APP>_URL` - URL for remote apps
- `NODE_ENV` - Environment (development, production)

## Troubleshooting

### Command not found

If you get "command not found", ensure the CLI is installed:

\`\`\`bash
npm install -g @buffet/cli
\`\`\`

Or use npx:

\`\`\`bash
npx buffet --version
\`\`\`

### Permission denied

On Unix systems, you may need to make the CLI executable:

\`\`\`bash
chmod +x node_modules/@buffet/cli/dist/index.js
\`\`\`

### Port already in use

If a port is already in use, specify a different port:

\`\`\`bash
buffet create my-app --port 3010
\`\`\`

## Getting Help

For more information on any command:

\`\`\`bash
buffet --help
buffet create --help
buffet add-remote --help
\`\`\`

## Related Documentation

- [Getting Started](./getting-started.md)
- [Architecture Guide](./architecture.md)
- [API Reference](./api-reference.md)
\`\`\`
