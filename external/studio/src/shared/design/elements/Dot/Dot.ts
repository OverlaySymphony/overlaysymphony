import stylesheet from "./Dot.css" with { type: "css" }

export default class Dot extends HTMLElement {
  public static name = "os-dot"

  constructor() {
    super()

    const root = this.attachShadow({ mode: "open" })
    root.adoptedStyleSheets.push(stylesheet)
  }
}

window.customElements.define(Dot.name, Dot)
