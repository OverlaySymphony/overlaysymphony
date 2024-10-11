export class Scene extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["width", "height"]
  }

  root: ShadowRoot
  stylesheet: CSSStyleSheet

  constructor() {
    super()

    this.stylesheet = new CSSStyleSheet()

    this.stylesheet.insertRule(`:host { --width: 100vw; --height: 100vh; }`)

    this.stylesheet.insertRule(
      `:host { display: block; position: relative; overflow: hidden; width: var(--width); height: var(--height); }`,
    )

    this.stylesheet.insertRule(
      `.widgets { position: absolute; width: 100%; height: 100%; }`,
    )

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(this.stylesheet)

    const widgets = document.createElement("div")
    widgets.classList.add("widgets")

    const slot = document.createElement("slot")
    widgets.append(slot)

    this.root.append(widgets)
  }

  get width(): number | undefined {
    return parseInt(this.getAttribute("width") ?? "") || undefined
  }

  get height(): number | undefined {
    return parseInt(this.getAttribute("height") ?? "") || undefined
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if ((name === "width" || name === "height") && oldValue !== newValue) {
      this.update()
    }
  }

  update(): void {
    for (const index in [...this.stylesheet.cssRules]) {
      const rule = this.stylesheet.cssRules[index] as CSSStyleRule
      if (
        rule.selectorText === ":host" &&
        rule.style[0] === "--width" &&
        rule.style[1] === "--height"
      ) {
        this.stylesheet.deleteRule(+index)
        break
      }
    }

    const width = this.width
    const height = this.height

    this.stylesheet.insertRule(
      `:host { --width: ${width ? `${width}px` : "100vw"}; --height: ${height ? `${height}px` : "100vh"}; }`,
    )
  }
}

window.customElements.define("overlaysymphony-scene", Scene)
