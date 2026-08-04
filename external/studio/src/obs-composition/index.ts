import "./obs-composition.global.css"
import "./Alert/index.ts"

import type Alert from "./Alert/index.ts"
import { init } from "./services/controller/index.ts"

const loading = document.querySelector<Alert>("#loading")
if (!loading) throw new Error("Cannot find #loading.")

await init()

loading.dismiss()
