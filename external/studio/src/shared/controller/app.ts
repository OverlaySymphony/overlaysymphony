import { type ModuleConfig } from "./module.ts"

export type AppConfig = {
  id: string
  label: string
  notes?: string
  secretKey: CryptoKey
  modules: Record<string, ModuleConfig>
}

export type AppConfigString = Omit<AppConfig, "secretKey" | "modules"> & {
  secretKey: string
  modules?: AppConfig["modules"]
}

export const mockAppConfig: AppConfigString = {
  id: "mock",
  label: "Mock App",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "ngOFim0eIlWDdVZ1uLOitmdlVwPjX6lrmIJyKB5xYSI",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
}
