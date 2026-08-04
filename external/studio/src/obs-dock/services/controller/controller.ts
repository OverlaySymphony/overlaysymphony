import { parse as parseQueryString } from "@overlaysymphony/core/libs/querystring"

import { type ModuleInstance } from "#shared/controller"

import { initDirectChannel } from "./libs/channelDirect.ts"
import { initSharedChannel } from "./libs/channelShared.ts"
import { fetchConfig } from "./libs/config.ts"
import { loadModule } from "./libs/module.ts"
import { type CompositionStore, readStore, saveStore } from "./libs/store.ts"

export async function init(): Promise<void> {
  const { id } = parseQueryString(window.location.search) as { id: string }
  const config = await fetchConfig(id)
  const store = await readStore(config)
  await saveStore(config, store)

  const modules: Record<string, ModuleInstance> = {}
  for (const id in config.modules) {
    modules[id] = await loadModule(id, config.modules[id], store.modules[id])
  }

  store.channel = await initSharedChannel(async (compositionId) => {
    if (store.compositions[compositionId]) {
      store.compositions[compositionId].channel.close()
    }

    const compositionStore: CompositionStore = (store.compositions[
      compositionId
    ] = {
      state: "connecting",
      channel: await initDirectChannel(compositionId, async (data) => {
        compositionStore.state = "registered"

        // Listen for subscribed from the dock
        //   subscribe
        //   forward events
      }),
    })
  })
}
