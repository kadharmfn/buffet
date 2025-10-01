import fs from "fs"
import path from "path"

interface AddRemoteOptions {
  url: string
  scope: string
  module: string
}

export async function addRemote(name: string, options: AddRemoteOptions) {
  console.log(`Adding remote: ${name}`)
  console.log(`URL: ${options.url}`)
  console.log(`Scope: ${options.scope}`)
  console.log(`Module: ${options.module}`)

  const configPath = path.join(process.cwd(), "buffet.config.ts")

  if (!fs.existsSync(configPath)) {
    console.error("Error: buffet.config.ts not found")
    console.error("Make sure you're in the root directory of a Buffet project")
    process.exit(1)
  }

  let config = fs.readFileSync(configPath, "utf-8")

  // Add remote to config
  const remoteConfig = `    ${name}: {
      name: "${name}",
      url: process.env.NEXT_PUBLIC_${name.toUpperCase()}_URL || "${options.url}",
      scope: "${options.scope}",
      module: "${options.module}",
      timeout: 5000,
      retries: 3,
    },`

  // Insert before the closing brace of remotes
  config = config.replace(/(\s+)(\},\s+shared:)/, `$1${remoteConfig}\n$1$2`)

  fs.writeFileSync(configPath, config)

  console.log(`\nSuccess! Added ${name} to buffet.config.ts`)
  console.log("\nNext steps:")
  console.log(`  1. Add NEXT_PUBLIC_${name.toUpperCase()}_URL to your .env file`)
  console.log(`  2. Restart your development server`)
}
