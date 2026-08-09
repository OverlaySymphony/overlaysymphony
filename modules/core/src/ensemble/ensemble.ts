import { type ModuleConfig } from "../module/index.ts"

export type EnsembleConfig = {
  id: string
  label: string
  notes?: string
  secretKey: CryptoKey
  modules: Record<string, ModuleConfig>
}

export type EnsembleConfigRaw = Omit<
  EnsembleConfig,
  "secretKey" | "modules"
> & {
  secretKey: string
  modules?: EnsembleConfig["modules"]
}
