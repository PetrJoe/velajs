import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import Handlebars from "handlebars";

export async function writeTemplate(path: string, template: string, data: Record<string, unknown>) {
  await mkdir(dirname(path), { recursive: true });
  const body = Handlebars.compile(template)(data);
  await writeFile(path, body, "utf8");
}

export async function appendUnique(path: string, content: string) {
  const current = await readFile(path, "utf8").catch(() => "");
  if (!current.includes(content)) {
    await writeFile(path, `${current.trimEnd()}\n${content}\n`, "utf8");
  }
}
