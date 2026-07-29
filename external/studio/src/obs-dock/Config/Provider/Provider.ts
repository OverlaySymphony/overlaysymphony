import "#design/elements/Dot"

import stylesheet from "./Provider.css" with { type: "css" }

export default class Provider extends HTMLElement {
  public static name = "os-app-config-provider"

  private root: ShadowRoot
  private built = false

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)
  }

  connectedCallback(): void {
    if (this.built) return
    this.built = true

    this.build()
  }

  private build() {
    const name = this.getAttribute("name") ?? ""
    const connected = this.getAttribute("status") === "connected"

    this.root.innerHTML = `
      <div class="top">
        <os-dot tone="${connected ? "ok" : "off"}"></os-dot>
        <span class="name">${name}</span>
        <span class="status">${connected ? "Connected" : "Not set"}</span>
      </div>
      <slot></slot>
    `
  }
}

window.customElements.define(Provider.name, Provider)
