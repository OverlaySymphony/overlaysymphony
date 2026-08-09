import { type EnsembleConfig } from "@overlaysymphony/core/ensemble"
import {
  type Encrypted,
  decrypt,
  encrypt,
  hash,
} from "@overlaysymphony/core/libs/crypto"
import { type ModuleStore } from "@overlaysymphony/core/module"

import { type DirectChannel, type SharedChannel } from "#shared/controller"

type EnsembleStore = {
  id: string
  directoryHandle: unknown
  channel: SharedChannel
  modules: Record<string, ModuleStore>
  compositions: Record<string, CompositionStore>
}

type EnsembleStoreCache = {
  id: string
  directoryHandle: unknown
  modules: Record<string, ModuleStore>
}

export type CompositionStore = {
  state: "connecting" | "registered"
  channel: DirectChannel
}

export async function readStore(
  config: EnsembleConfig,
): Promise<EnsembleStore> {
  const key = await hash(config.secretKey, `store:ensemble:${config.id}`)
  const encrypted = localStorage.getItem(key)

  const raw = encrypted
    ? await decrypt(config.secretKey, JSON.parse(encrypted) as Encrypted)
    : JSON.stringify({
        id: config.id,
        directoryHandle: undefined,
        modules: {},
      } satisfies EnsembleStoreCache)

  const cache = JSON.parse(raw) as EnsembleStoreCache

  return {
    ...cache,
    channel: {} as SharedChannel,
    compositions: {},
  }
}

export async function saveStore(
  config: EnsembleConfig,
  store: EnsembleStore,
): Promise<void> {
  const key = await hash(config.secretKey, `store:ensemble:${config.id}`)

  const cache: EnsembleStoreCache = {
    id: store.id,
    directoryHandle: store.directoryHandle,
    modules: store.modules,
  }

  const raw = JSON.stringify(cache)

  const encrypted = JSON.stringify(await encrypt(config.secretKey, raw))

  localStorage.setItem(key, encrypted)
}
