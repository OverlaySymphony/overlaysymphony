import createDefer from "@overlaysymphony/core/libs/defer"
import { parse as parseQueryString } from "@overlaysymphony/core/libs/querystring"

import { type AutomationConfig, type ModuleInstance } from "#shared/controller"

import { initDirectChannel } from "./libs/channelDirect.ts"
import { initSharedChannel } from "./libs/channelShared.ts"
import { fetchConfig } from "./libs/config.ts"
import { loadModule } from "./libs/module.ts"
import { type AutomationStore, readStore, saveStore } from "./libs/store.ts"

export async function init(): Promise<void> {
  const { id } = parseQueryString(window.location.search) as { id: string }
  const config = await fetchConfig(id)
  const store = await readStore(config)
  await saveStore(config, store)

  const modules: Record<string, ModuleInstance> = {}
  for (const id in config.modules) {
    modules[id] = await loadModule(id, config.modules[id], store.modules[id])
  }

  const defer = createDefer()
  store.channel = await initDirectChannel(config.id, async (data) => {
    for (const id in config.automations) {
      const automationConfig: AutomationConfig = config.automations[id]
      const automationStore: AutomationStore = store.automations[id] ?? {
        action: {},
      }

      console.log(automationConfig, automationStore)
      // Load automation
      // Subscribe to events
      // Listen for forwarded events
      //   run the automation handlers
    }

    defer.resolve()
  })

  await initSharedChannel(config.id)

  await defer.promise
}
