import fs from "node:fs"
import path from "node:path"

import events from "./data/index.js"

const items: Record<string, string[]> = {}
for (const { definition } of events) {
  for (const key in definition) {
    const description = definition[key].description

    if (!items[key]) {
      items[key] = []
    }

    if (!items[key].includes(description)) {
      items[key].push(description)
    }
  }
}

for (const key in items) {
  if (items[key].length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete items[key]
  }
}

console.log(items)

events.sort((a, b) => (a.type > b.type ? 1 : -1))
fs.writeFileSync(
  path.resolve(import.meta.dirname, "data", "data.json"),
  JSON.stringify(events, null, 2) + "\n",
)
