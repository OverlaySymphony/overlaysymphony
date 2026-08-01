import Component from "#shared/Component"

import stylesheet from "./Button.css" with { type: "css" }

export default class Button extends Component {
  public static name = "os-button"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `<button><slot></slot></button>`
  }
}

window.customElements.define(Button.name, Button)
