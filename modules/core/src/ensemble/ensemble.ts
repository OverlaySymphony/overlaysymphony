import { type ModuleConfig } from "../module/index.ts"

export type EnsembleConfig = {
  id: string
  label: string
  notes?: string
  secretKey: string
  modules?: Record<string, ModuleConfig>
}

export type EnsembleConfigResolved = Required<
  Omit<EnsembleConfig, "notes" | "secretKey">
> &
  Pick<EnsembleConfig, "notes"> & {
    secretKey: CryptoKey
  }
