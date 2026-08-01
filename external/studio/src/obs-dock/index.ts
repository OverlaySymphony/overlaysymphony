import "@overlaysymphony/twitch/ui/authentication"

import "./obs-dock.global.css"
import "./Shell/index.ts"

import { init } from "./services/config/index.ts"
import type Shell from "./Shell/index.ts"

const shell = document.querySelector<Shell>("#shell")
if (!shell) throw new Error("Cannot find #shell.")

await init()

shell.removeAttribute("loading")
