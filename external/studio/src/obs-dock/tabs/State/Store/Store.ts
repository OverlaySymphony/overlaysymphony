import "#design/elements/Pill"

import Component from "#shared/Component"

import stylesheet from "./Store.css" with { type: "css" }

export default class Store extends Component {
  public static name = "dock-state-store"

  static observedAttributes = ["key", "scope"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const key = this.getAttribute("key") ?? ""
    const scope = this.getAttribute("scope") ?? ""

    this.root.innerHTML = `
      <span class="key">${key}</span>
      <span class="value"><slot></slot></span>
      <os-pill>${scope}</os-pill>
    `
  }
}

window.customElements.define(Store.name, Store)
