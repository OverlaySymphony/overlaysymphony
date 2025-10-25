export class OverlaySymfonyCoreError extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["module", "title"]
  }

  root: ShadowRoot
  element?: HTMLElement

  constructor() {
    super()

    const stylesheet = new CSSStyleSheet()

    stylesheet.insertRule(`
      :host {
        display: block;
      }
    `)

    stylesheet.insertRule(`
      .dialog {}
    `)

    this.root = this.attachShadow({ mode: "closed" })
    this.root.adoptedStyleSheets.push(stylesheet)

    void this.render()
  }

  get clientId(): string {
    return this.getAttribute("client-id") ?? ""
  }

  async render(): Promise<void> {
    this.root.innerHTML = '<div class="dialog"><slot /></div>'
  }
}

window.customElements.define(
  "overlaysymfony-core-error",
  OverlaySymfonyCoreError,
)
