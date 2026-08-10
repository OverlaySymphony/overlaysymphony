import { parse as parseQueryString } from "@overlaysymphony/core/libs/querystring"
import { type ModuleManifest } from "@overlaysymphony/core/module"

import { initDirectChannel } from "./libs/channelDirect.ts"
import { initSharedChannel } from "./libs/channelShared.ts"
import { fetchConfig } from "./libs/config.ts"
import { loadModule } from "./libs/module.ts"
import { readStore, saveStore } from "./libs/store.ts"

export async function init(): Promise<void> {
  const { id } = parseQueryString(window.location.search) as { id: string }
  const config = await fetchConfig(id)
  const store = await readStore(config)
  await saveStore(config, store)

  const modules: Record<string, ModuleManifest> = {}
  await Promise.all(
    Object.keys(config.modules).map(async (id) => {
      if (!store.modules[id]) {
        store.modules[id] = {}
      }

      const moduleConfig = config.modules[id]
      const moduleStore = store.modules[id]

      modules[id] = await loadModule(moduleConfig, moduleStore)
    }),
  )

  store.channel = await initSharedChannel(async (overlayId) => {
    if (store.overlays[overlayId]) {
      store.overlays[overlayId].channel.close()
    }

    store.overlays[overlayId] = {
      state: "initializing",
      channel: await initDirectChannel(overlayId, async (data) => {
        store.overlays[overlayId].state = "registered"

        // Listen for subscribed from the dock
        //   subscribe
        //   forward events
      }),
    }
  })
}
