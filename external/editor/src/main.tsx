import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@overlaysymphony/design/foundations.css"
import "./fullscreen.css"

import Editor from "./Editor/index.ts"

const root = document.getElementById("root")
if (!root) throw new Error("Missing #root")

createRoot(root).render(
  <StrictMode>
    <Editor />
  </StrictMode>,
)
