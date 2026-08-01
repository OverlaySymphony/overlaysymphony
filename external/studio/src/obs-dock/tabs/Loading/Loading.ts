import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Loading.css" with { type: "css" }

export default class Loading extends Component {
  public static name = "dock-loading"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-dot tone="ok"></os-dot>
      <span class="message">Loading…</span>
    `
  }
}

window.customElements.define(Loading.name, Loading)
