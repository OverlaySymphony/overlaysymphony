import {
  type EnsembleConfig,
  type EnsembleConfigRaw,
} from "@overlaysymphony/core/ensemble"
import { parseKey } from "@overlaysymphony/core/libs/crypto"

export async function fetchConfig(id: string): Promise<EnsembleConfig> {
  if (!id) {
    throw new Error("Missing ensemble config id.")
  }

  const url = URL.canParse(id)
    ? id
    : `http://www.example.com/ensemble/${id}.json`

  const {
    secretKey,
    modules = {},
    ...config
  } = (await (await fetch(url)).json()) as EnsembleConfigRaw

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
