import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@overlaysymphony/design/foundations.css"
import "./fullscreen.css"

import App from "./App/index.ts"

const root = document.getElementById("root")
if (!root) throw new Error("Missing #root")

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
