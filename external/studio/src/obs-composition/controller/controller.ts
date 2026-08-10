import { parse as parseQueryString } from "@overlaysymphony/core/libs/querystring"

import { loadAutomations } from "./libs/automation.ts"
import { initDirectChannel } from "./libs/channelDirect.ts"
import { initSharedChannel } from "./libs/channelShared.ts"
import { fetchConfig } from "./libs/config.ts"
import { loadModules } from "./libs/module.ts"
import { readStore, saveStore } from "./libs/store.ts"

export async function init(): Promise<void> {
  const { id } = parseQueryString(window.location.search) as { id: string }
  const config = await fetchConfig(id)
  const store = await readStore(config)

  const modules = await loadModules(config.modules, store.modules)

  const automations = await loadAutomations(
    config.automations,
    store.automations,
    modules,
  )

  await saveStore(config, store)

  await initSharedChannel(config.id)
  store.channel = await initDirectChannel(config.id, {
    // TODO
  })

  // fire module-init then composition-init events
  console.log(automations)
}
