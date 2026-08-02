import "#design/elements/Dot"

import tones from "#design/tones.css" with { type: "css" }
import Component from "#shared/Component"

import stylesheet from "./Provider.css" with { type: "css" }

export default class Provider extends Component {
  public static name = "dock-config-provider"

  static observedAttributes = ["label", "status", "tone"]

  constructor() {
    super(tones, stylesheet)
  }

  protected build(): void {
    const label = this.getAttribute("label") ?? ""
    const status = this.getAttribute("status") ?? ""
    const tone = this.getAttribute("tone")

    this.root.innerHTML = `
      <div class="header">
        <os-dot ${tone ? `tone="${tone}"` : ""}></os-dot>
        <span class="label">${label}</span>
        <span class="status">${status}</span>
      </div>

      <slot></slot>
    `
  }
}

window.customElements.define(Provider.name, Provider)
