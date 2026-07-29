import stylesheet from "./Note.css" with { type: "css" }

export default class Note extends HTMLElement {
  public static name = "os-note"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `<span class="lock" aria-hidden="true"></span><slot></slot>`
  }
}

window.customElements.define(Note.name, Note)
