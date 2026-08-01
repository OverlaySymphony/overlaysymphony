import Component from "#shared/Component"

import stylesheet from "./Label.css" with { type: "css" }

export default class Label extends Component {
  public static name = "os-label"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <slot></slot>
      <slot name="aside"></slot>
    `
  }
}

window.customElements.define(Label.name, Label)
