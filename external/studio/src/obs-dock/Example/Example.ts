import stylesheet from "./Example.css" with { type: "css" }

export default class Example extends HTMLElement {
  public static name = "os-example"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `"<slot></slot>"`
  }
}

window.customElements.define(Example.name, Example)
