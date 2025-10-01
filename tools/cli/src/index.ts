#!/usr/bin/env node

import { Command } from "commander"
import { createApp } from "./commands/create"
import { addRemote } from "./commands/add-remote"
import { devServer } from "./commands/dev"
import { buildAll } from "./commands/build"

const program = new Command()

program.name("buffet").description("CLI tool for Buffet microfront-end architecture").version("1.0.0")

program
  .command("create <name>")
  .description("Create a new micro-app")
  .option("-t, --template <template>", "Template to use (basic, dashboard, shop)", "basic")
  .option("-p, --port <port>", "Development port", "3000")
  .action(createApp)

program
  .command("add-remote <name>")
  .description("Add a remote app to the host configuration")
  .requiredOption("-u, --url <url>", "Remote app URL")
  .option("-s, --scope <scope>", "Module scope", "app")
  .option("-m, --module <module>", "Module path", "./App")
  .action(addRemote)

program
  .command("dev")
  .description("Start all applications in development mode")
  .option("-a, --app <app>", "Start specific app only")
  .action(devServer)

program
  .command("build")
  .description("Build all applications")
  .option("-a, --app <app>", "Build specific app only")
  .action(buildAll)

program.parse()
