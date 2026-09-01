import { parse as parseQueryString } from "@overlaysymphony/core/libs/querystring"

import { initDirectChannel } from "./libs/channelDirect.ts"
import { initSharedChannel } from "./libs/channelShared.ts"
import { fetchConfig } from "./libs/config.ts"
import { createEventLog } from "./libs/events.ts"
import { loadModules } from "./libs/module.ts"
import { readStore, saveStore } from "./libs/store.ts"

export async function init(): Promise<void> {
  const { id } = parseQueryString(window.location.search) as { id: string }
  const config = await fetchConfig(id)
  const store = await readStore(config)
  await saveStore(config, store)

  const events = createEventLog()
  const modules = await loadModules(
    config.modules,
    store.modules,
    events.record,
  )
  console.log(modules)

  store.channel = await initSharedChannel(async (name) => {
    if (store.overlays[name]) {
      store.overlays[name].channel.close()
    }

    store.overlays[name] = {
      state: "initializing",
      channel: await initDirectChannel(name, async (data) => {
        store.overlays[name].state = "registered"

        // load trigger nodes
      }),
    }
  })
}
