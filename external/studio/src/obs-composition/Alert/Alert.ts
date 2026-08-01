import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Alert.css" with { type: "css" }

export default class Alert extends Component {
  public static name = "composition-alert"

  static observedAttributes = ["label", "severity"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const label = this.getAttribute("label") ?? ""
    const severity = this.getAttribute("severity")

    this.root.innerHTML = `
      <div class="panel">
        <div class="head">
          ${severity ? `<span class="severity">${severity}</span>` : ""}

          <div class="meta">
            <os-dot tone="err"></os-dot>
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
