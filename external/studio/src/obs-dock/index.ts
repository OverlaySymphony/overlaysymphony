import "@overlaysymphony/twitch/ui/authentication"

import "./obs-dock.global.css"
import "./Shell/index.ts"

import { init } from "./controller/index.ts"
import type Shell from "./Shell/index.ts"

const shell = document.querySelector<Shell>("#shell")
if (!shell) throw new Error("Cannot find #shell.")

try {
  await init()
  shell.removeAttribute("loading")
} catch (error) {
  const message =
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : "An unknown error has occurred."

  shell.setAttribute("error", message)
}
