import stylesheet from "./Label.css" with { type: "css" }

export default class Label extends HTMLElement {
  public static name = "os-label"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `<slot></slot><slot name="aside"></slot>`
  }
}

window.customElements.define(Label.name, Label)
