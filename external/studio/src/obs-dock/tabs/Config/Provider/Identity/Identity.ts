import Component from "#shared/Component"

import stylesheet from "./Identity.css" with { type: "css" }

export default class Identity extends Component {
  public static name = "dock-config-provider-identity"

  static observedAttributes = ["handle", "meta"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const handle = this.getAttribute("handle") ?? ""
    const meta = this.getAttribute("meta") ?? ""

    this.root.innerHTML = `
      <span class="handle">${handle}</span>
      <span class="meta">${meta}</span>
    `
  }
}

window.customElements.define(Identity.name, Identity)
