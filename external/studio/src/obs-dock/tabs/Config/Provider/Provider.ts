import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Provider.css" with { type: "css" }

export default class Provider extends Component {
  public static name = "dock-config-provider"

  static observedAttributes = ["label", "status"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const label = this.getAttribute("label") ?? ""
    const status = this.getAttribute("status") ?? ""
    const connected = status === "connected"

    this.root.innerHTML = `
      <div class="header">
        <os-dot tone="${connected ? "ok" : "off"}"></os-dot>
        <span class="label">${label}</span>
        <span class="status">${status}</span>
      </div>

      <slot></slot>
    `
  }
}

window.customElements.define(Provider.name, Provider)
