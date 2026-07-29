import stylesheet from "./Button.css" with { type: "css" }

export default class Button extends HTMLElement {
  public static name = "os-button"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `<button><slot></slot></button>`
  }
}

window.customElements.define(Button.name, Button)
