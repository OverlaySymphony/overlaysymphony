import {
  type CompositionConfigResolved,
  type CompositionConfig,
} from "@overlaysymphony/core/composition"
import { parseKey } from "@overlaysymphony/core/libs/crypto"

export async function fetchConfig(
  id: string,
): Promise<CompositionConfigResolved> {
  if (!id) {
    throw new Error("Missing composition config id.")
  }

  const url = URL.canParse(id)
    ? id
    : `http://www.example.com/composition/${id}.json`

  const {
    secretKey,
    modules = {},
    ...config
  } = (await (await fetch(url)).json()) as CompositionConfig

  modules["@core"] = {
    label: "Core",
    module: "@core",
  }

  return {
    ...config,
    modules,
    secretKey: await parseKey(secretKey),
  }
}
