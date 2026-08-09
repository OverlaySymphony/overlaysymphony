import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Error.css" with { type: "css" }

export default class Error extends Component {
  public static name = "dock-error"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-dot tone="err"></os-dot>
      <span class="message"><slot></slot></span>
    `
  }
}

window.customElements.define(Error.name, Error)
