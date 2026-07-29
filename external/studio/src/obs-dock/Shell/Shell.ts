import "../Config/index.ts"

import stylesheet from "./Shell.css" with { type: "css" }

type Tab = "config" | "events" | "state" | "connections"

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "config", label: "Config" },
  { id: "events", label: "Events" },
  { id: "state", label: "State" },
  { id: "connections", label: "Connections" },
]

export default class Shell extends HTMLElement {
  public static name = "os-app-shell"

  private root: ShadowRoot
  private active: Tab = "config"

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `
      <header class="head">
        <span class="brand" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span class="name">Overlay <b>Symphony</b></span>
        <span class="version">v0.4.2</span>
      </header>
      <nav class="tabs" role="tablist">
        ${tabs
          .map(
            ({ id, label }) =>
              `<button class="tab" role="tab" data-tab="${id}">${label}</button>`,
          )
          .join("")}
      </nav>
      <div class="body"></div>
    `

    for (const button of this.root.querySelectorAll<HTMLButtonElement>(
      ".tab",
    )) {
      button.addEventListener("click", () => {
        this.active = button.dataset.tab as Tab
        this.render()
      })
    }

    this.render()
  }

  private render() {
    for (const button of this.root.querySelectorAll<HTMLButtonElement>(
      ".tab",
    )) {
      button.classList.toggle("active", button.dataset.tab === this.active)
    }

    const body = this.root.querySelector(".body")
    if (body) {
      body.innerHTML =
        this.active === "config" ? `<os-app-config></os-app-config>` : ""
    }
  }
}

window.customElements.define(Shell.name, Shell)
