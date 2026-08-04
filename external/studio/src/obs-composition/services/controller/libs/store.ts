import {
  type CompositionConfig,
  type DirectChannel,
  type Encrypted,
  type ModuleStore,
  decrypt,
  encrypt,
  hash,
} from "#shared/controller"

type CompositionStore = {
  id: string
  channel: DirectChannel
  modules: Record<string, ModuleStore>
  automations: Record<string, AutomationStore>
}

type CompositionStoreCache = {
  id: string
  modules: Record<string, ModuleStore>
  automations: Record<string, AutomationStore>
}

export type AutomationStore = {
  actions: Record<string, ActionStore>
}

type ActionStore = {
  state: ""
}

export async function readStore(
  config: CompositionConfig,
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
    channel: {} as DirectChannel,
  }
}

export async function saveStore(
  config: CompositionConfig,
  store: CompositionStore,
): Promise<void> {
  const key = await hash(config.secretKey, `store:app:${config.id}`)

  const cache: CompositionStoreCache = {
    id: store.id,
    modules: store.modules,
    automations: store.automations,
  }

  const raw = JSON.stringify(cache)

  const encrypted = JSON.stringify(await encrypt(config.secretKey, raw))

  localStorage.setItem(key, encrypted)
}
