import "#design/elements/Dot"

import tones from "#design/tones.css" with { type: "css" }
import Component from "#shared/Component"

import stylesheet from "./Alert.css" with { type: "css" }

export default class Alert extends Component {
  public static name = "composition-alert"

  static observedAttributes = ["label", "eyebrow", "tone"]

  constructor() {
    super(tones, stylesheet)
  }

  protected build(): void {
    const label = this.getAttribute("label") ?? ""
    const eyebrow = this.getAttribute("eyebrow")
    const tone = this.getAttribute("tone")

    this.root.innerHTML = `
      <div class="panel">
        <div class="head">
          ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}

          <div class="meta">
            <os-dot ${tone ? `tone="${tone}"` : ""}></os-dot>
            <span class="label">${label}</span>
          </div>
        </div>

        <div class="body">
          <slot></slot>
        </div>

        <slot name="actions"></slot>
      </div>
    `
  }
}

window.customElements.define(Alert.name, Alert)
