import {
  type CompositionConfig,
  mockCompositionConfig,
  parseKey,
} from "#shared/controller"

export async function fetchConfig(id: string): Promise<CompositionConfig> {
  if (id) {
    throw new Error("Does not support external composition configs yet.")
  }

  const { secretKey, ...config } =
    import.meta.env.DEV && !id
      ? mockCompositionConfig
      : ((await (
          await fetch(`http://www.example.com/composition/${id}.json`)
        ).json()) as typeof mockCompositionConfig)

  return {
    ...config,
    secretKey: await parseKey(secretKey),
  }
}
