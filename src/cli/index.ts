import { makeApp } from "@/cli/commands/make-app";
import { makeMigration } from "@/cli/commands/make-migration";
import { makeResource } from "@/cli/commands/make-resource";
import { makeUi } from "@/cli/commands/make-ui";

const [command, name] = process.argv.slice(2);

const aliases: Record<string, (name: string) => Promise<void>> = {
  "make:app": makeApp,
  "make:resource": makeResource,
  "make:migration": makeMigration,
  "make:ui": makeUi,
  "make:model": makeResource,
  "make:service": makeApp,
  "make:controller": makeApp,
  "make:validator": makeApp,
  "make:test": makeApp
};

async function main() {
  const handler = aliases[command];
  if (!handler) {
    console.log("velajs CLI");
    console.log("Usage: npm run make:<app|resource|migration|ui> <name>");
    return;
  }

  await handler(name);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
