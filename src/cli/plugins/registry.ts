import { z } from "zod";

export const pluginSchema = z.object({
  name: z.string(),
  version: z.string(),
  compatibleWith: z.string(),
  enabledApps: z.array(z.string()).optional()
});

export type PluginDefinition = z.infer<typeof pluginSchema> & {
  setup?: () => Promise<void> | void;
  teardown?: () => Promise<void> | void;
  commands?: Record<string, () => Promise<void>>;
};

const plugins = new Map<string, PluginDefinition>();

export function registerPlugin(plugin: PluginDefinition) {
  plugins.set(plugin.name, pluginSchema.parse(plugin) as PluginDefinition);
}

export function getPlugins() {
  return [...plugins.values()];
}
