import { type CompositionConfigResolved } from "@overlaysymphony/core/composition"
import {
  type Encrypted,
  decrypt,
  encrypt,
  hash,
} from "@overlaysymphony/core/libs/crypto"
import { type ModuleStore } from "@overlaysymphony/core/module"

import { type AutomationStore } from "./automation.ts"
import { type DirectConnection } from "./channelDirect.ts"

type CompositionStore = {
  id: string
  channel: DirectConnection
  modules: Record<string, ModuleStore>
  automations: Record<string, AutomationStore>
}

type CompositionStoreCache = {
  id: string
  modules: Record<string, ModuleStore>
  automations: Record<string, AutomationStore>
}

export async function readStore(
  config: CompositionConfigResolved,
): Promise<CompositionStore> {
  const key = await hash(config.secretKey, `store:composition:${config.id}`)
  const encrypted = localStorage.getItem(key)

  const raw = encrypted
    ? await decrypt(config.secretKey, JSON.parse(encrypted) as Encrypted)
    : JSON.stringify({
        id: config.id,
        modules: {},
        automations: {},
      } satisfies CompositionStoreCache)

  const cache = JSON.parse(raw) as CompositionStoreCache

  return {
    ...cache,
    channel: {} as DirectConnection,
  }
}

export async function saveStore(
  config: CompositionConfigResolved,
  store: CompositionStore,
): Promise<void> {
  const key = await hash(config.secretKey, `store:composition:${config.id}`)

  const cache: CompositionStoreCache = {
    id: store.id,
    modules: store.modules,
    automations: store.automations,
  }

  const raw = JSON.stringify(cache)

  const encrypted = JSON.stringify(await encrypt(config.secretKey, raw))

  localStorage.setItem(key, encrypted)
}
