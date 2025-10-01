# Getting Started with Buffet

This guide will help you set up and run Buffet microfront-end architecture locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn/pnpm)
- **Git** for version control

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/buffet.git
cd buffet
\`\`\`

### 2. Install Dependencies

Buffet uses a monorepo structure with workspaces. Install all dependencies:

\`\`\`bash
npm install
\`\`\`

This will install dependencies for:
- Host application
- All remote applications (dashboard, shop, blog)
- Shared packages (core, ui, utils, types)

### 3. Environment Setup

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

The default configuration works for local development. Update if needed:

\`\`\`env
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3001
NEXT_PUBLIC_SHOP_URL=http://localhost:3002
NEXT_PUBLIC_BLOG_URL=http://localhost:3003
\`\`\`

## Running the Application

### Start All Applications

Run all applications simultaneously:

\`\`\`bash
npm run dev
\`\`\`

This starts:
- **Host** on http://localhost:3000
- **Dashboard** on http://localhost:3001
- **Shop** on http://localhost:3002
- **Blog** on http://localhost:3003

### Start Individual Applications

You can also run applications separately:

\`\`\`bash
# Host application
npm run dev:host

# Dashboard micro-app
npm run dev:dashboard

# Shop micro-app
npm run dev:shop

# Blog micro-app
npm run dev:blog
\`\`\`

## Project Structure

\`\`\`
buffet/
├── apps/
│   ├── host/              # Main host application (port 3000)
│   ├── dashboard/         # Dashboard micro-app (port 3001)
│   ├── shop/              # Shop micro-app (port 3002)
│   └── blog/              # Blog micro-app (port 3003)
├── packages/
│   ├── buffet-core/       # Core framework
│   ├── shared-ui/         # Shared components
│   ├── shared-utils/      # Utilities
│   └── shared-types/      # TypeScript types
├── docs/                  # Documentation
└── tools/                 # CLI and dev tools
\`\`\`

## Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the Buffet landing page
3. Navigate to different sections:
   - Dashboard: http://localhost:3000/dashboard
   - Shop: http://localhost:3000/shop
   - Blog: http://localhost:3000/blog

## Development Workflow

### Making Changes

1. **Edit a micro-app**: Changes in `apps/dashboard`, `apps/shop`, or `apps/blog` are isolated
2. **Edit shared code**: Changes in `packages/*` affect all apps
3. **Hot reload**: All changes trigger automatic reload

### Adding a New Micro-app

\`\`\`bash
# Create new app directory
mkdir apps/my-app
cd apps/my-app

# Initialize Next.js app
npx create-next-app@latest . --typescript --tailwind --app

# Add to workspace
# Update package.json workspaces array
\`\`\`

### Building for Production

\`\`\`bash
# Build all applications
npm run build

# Build specific app
npm run build:host
npm run build:dashboard
\`\`\`

## Testing

\`\`\`bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
\`\`\`

## Troubleshooting

### Port Already in Use

If a port is already in use, you can change it:

\`\`\`bash
# In apps/host/package.json
"dev": "next dev -p 3010"
\`\`\`

### Module Not Found

Clear node_modules and reinstall:

\`\`\`bash
npm run clean
npm install
\`\`\`

### Remote App Not Loading

1. Ensure the remote app is running
2. Check the URL in `.env.local`
3. Check browser console for errors
4. Verify CORS settings if using different domains

## Next Steps

- Read the [Architecture Guide](./architecture.md)
- Explore [API Reference](./api-reference.md)
- Check [Best Practices](./best-practices.md)
- Join our [Discord Community](https://discord.gg/buffet)

## Getting Help

- GitHub Issues: Report bugs or request features
- Discord: Ask questions and get help
- Documentation: Comprehensive guides and references

Happy coding with Buffet!
\`\`\`
