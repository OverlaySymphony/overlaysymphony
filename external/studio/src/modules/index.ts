import core from "./@core/manifest.ts"
import datastore from "./datastore/manifest.ts"
import overlay from "./overlay/manifest.ts"
import twitch from "./twitch/manifest.ts"

const files = {
  "modules/@core/manifest.json": core,
  "modules/datastore/manifest.json": datastore,
  "modules/overlay/manifest.json": overlay,
  "modules/twitch/manifest.json": twitch,
}

export default files
