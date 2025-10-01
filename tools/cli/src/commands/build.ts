import { spawn } from "child_process"

interface BuildOptions {
  app?: string
}

export async function buildAll(options: BuildOptions) {
  if (options.app) {
    console.log(`Building ${options.app}...`)
    const child = spawn("npm", ["run", `build:${options.app}`], {
      stdio: "inherit",
      shell: true,
    })

    child.on("error", (error) => {
      console.error(`Error building ${options.app}:`, error)
      process.exit(1)
    })
  } else {
    console.log("Building all applications...")
    const child = spawn("npm", ["run", "build"], {
      stdio: "inherit",
      shell: true,
    })

    child.on("error", (error) => {
      console.error("Error building applications:", error)
      process.exit(1)
    })
  }
}
