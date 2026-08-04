import { type ModuleConfig } from "./module.ts"

export type AppConfig = {
  id: string
  label: string
  notes?: string
  secretKey: CryptoKey
  modules: Record<string, ModuleConfig>
}

export const mockAppConfig = {
  id: "mock",
  label: "Mock App",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "ngOFim0eIlWDdVZ1uLOitmdlVwPjX6lrmIJyKB5xYSI",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  modules: {},
} satisfies Omit<AppConfig, "secretKey"> & { secretKey: string }
