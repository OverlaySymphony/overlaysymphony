import { type AppConfig, mockAppConfig, parseKey } from "#shared/controller"

export async function fetchConfig(id: string): Promise<AppConfig> {
  if (id) {
    throw new Error("Does not support external app configs yet.")
  }

  const { secretKey, ...config } =
    import.meta.env.DEV && !id
      ? mockAppConfig
      : ((await (
          await fetch(`http://www.example.com/app/${id}.json`)
        ).json()) as typeof mockAppConfig)

  return {
    ...config,
    secretKey: await parseKey(secretKey),
  }
}
