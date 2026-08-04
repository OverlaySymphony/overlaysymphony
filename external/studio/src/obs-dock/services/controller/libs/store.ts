import {
  type AppConfig,
  type DirectChannel,
  type Encrypted,
  type ModuleStore,
  type SharedChannel,
  decrypt,
  encrypt,
  hash,
} from "#shared/controller"

type AppStore = {
  id: string
  directoryHandle: unknown
  channel: SharedChannel
  modules: Record<string, ModuleStore>
  compositions: Record<string, CompositionStore>
}

type AppStoreCache = {
  id: string
  directoryHandle: unknown
  modules: Record<string, ModuleStore>
}

export type CompositionStore = {
  state: "connecting" | "registered"
  channel: DirectChannel
}

export async function readStore(config: AppConfig): Promise<AppStore> {
  const key = await hash(config.secretKey, `store:app:${config.id}`)
  const encrypted = localStorage.getItem(key)

  const raw = encrypted
    ? await decrypt(config.secretKey, JSON.parse(encrypted) as Encrypted)
    : JSON.stringify({
        id: config.id,
        directoryHandle: undefined,
        modules: {},
      } satisfies AppStoreCache)

  const cache = JSON.parse(raw) as AppStoreCache

  return {
    ...cache,
    channel: {} as SharedChannel,
    compositions: {},
  }
}

export async function saveStore(
  config: AppConfig,
  store: AppStore,
): Promise<void> {
  const key = await hash(config.secretKey, `store:app:${config.id}`)

  const cache: AppStoreCache = {
    id: store.id,
    directoryHandle: store.directoryHandle,
    modules: store.modules,
  }

  const raw = JSON.stringify(cache)

  const encrypted = JSON.stringify(await encrypt(config.secretKey, raw))

  localStorage.setItem(key, encrypted)
}
