import "./obs-composition.global.css"
import "./Alert/index.ts"

import type Alert from "./Alert/index.ts"
import { init } from "./services/controller/index.ts"

const loading = document.querySelector<Alert>("#loading")
if (!loading) throw new Error("Cannot find #loading.")

try {
  await init()
  loading.dismiss()
} catch (error) {
  const message =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : "An unknown error has occurred."

  loading.setAttribute("tone", "err")
  loading.setAttribute("label", "Error")
  loading.setAttribute("eyebrow", "")
  loading.innerHTML = `<p>${message}</p>`
}
