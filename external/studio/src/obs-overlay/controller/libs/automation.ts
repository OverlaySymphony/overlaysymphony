import { type AutomationConfig } from "@overlaysymphony/core/composition"

import { type ModuleRuntimes } from "./module.ts"

export type AutomationStore = {
  actions: Record<string, ActionStore>
}

type ActionStore = {
  state: ""
}

export type AutomationInstance = {
  foo: () => Promise<void>
}

export async function loadAutomations(
  config: Record<string, AutomationConfig>,
  store: Record<string, AutomationStore>,
  modules: Record<string, ModuleRuntimes>,
): Promise<Record<string, AutomationInstance>> {
  const automations: Record<string, AutomationInstance> = {}
  await Promise.all(
    Object.keys(config).map(async (id) => {
      if (!store[id]) {
        store[id] = { actions: {} }
      }

      const automationConfig = config[id]
      const automationStore = store[id]

      automations[id] = await loadAutomation(automationConfig, automationStore)
    }),
  )

  return automations
}

export async function loadAutomation(
  config: AutomationConfig,
  store: AutomationStore,
): Promise<AutomationInstance> {
  // Load automation
  // initialize nodes

  // Note: when calling module.nodes[node], add `next` to output that contains the full output data

  const instance: AutomationInstance = {
    foo: async () => undefined,
  }

  return instance
}
