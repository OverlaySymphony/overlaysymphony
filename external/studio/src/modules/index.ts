import core from "./@core/manifest.ts"
import datastore from "./datastore/manifest.ts"
import elements from "./elements/manifest.ts"
import twitch from "./twitch/manifest.ts"

const files = {
  "modules/@core/manifest.json": core,
  "modules/datastore/manifest.json": datastore,
  "modules/elements/manifest.json": elements,
  "modules/twitch/manifest.json": twitch,
}

export default files
