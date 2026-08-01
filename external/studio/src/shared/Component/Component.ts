export default class Component extends HTMLElement {
  private built = false
  protected root: ShadowRoot

  constructor(stylesheet?: CSSStyleSheet) {
    super()

    this.root = this.attachShadow({ mode: "open" })

    if (stylesheet) {
      this.root.adoptedStyleSheets.push(stylesheet)
    }
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (!this.built) return
    if (oldValue === newValue) return

    this.build()
  }

  connectedCallback(): void {
    if (this.built) return
    this.built = true

    this.build()
  }

  protected build(): void {
    this.root.innerHTML = `<slot></slot>`
  }
}
