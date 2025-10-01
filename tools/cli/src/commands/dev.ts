import { spawn } from "child_process"

interface DevOptions {
  app?: string
}

export async function devServer(options: DevOptions) {
  if (options.app) {
    console.log(`Starting ${options.app} in development mode...`)
    const child = spawn("npm", ["run", `dev:${options.app}`], {
      stdio: "inherit",
      shell: true,
    })

    child.on("error", (error) => {
      console.error(`Error starting ${options.app}:`, error)
      process.exit(1)
    })
  } else {
    console.log("Starting all applications in development mode...")
    const child = spawn("npm", ["run", "dev"], {
      stdio: "inherit",
      shell: true,
    })

    child.on("error", (error) => {
      console.error("Error starting applications:", error)
      process.exit(1)
    })
  }
}
