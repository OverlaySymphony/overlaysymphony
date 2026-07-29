import stylesheet from "./Pill.css" with { type: "css" }

export default class Pill extends HTMLElement {
  public static name = "os-pill"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `<slot></slot>`
  }
}

window.customElements.define(Pill.name, Pill)
