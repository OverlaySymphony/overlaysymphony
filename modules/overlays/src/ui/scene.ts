import createEmotion, { type Emotion } from "@emotion/css/create-instance"

export default class Scene extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["width", "height"]
  }

  root: ShadowRoot
  emotion: Emotion

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })

    this.emotion = createEmotion({
      key: "overlaysymphony-scene",
      container: this.root,
    })

    this.emotion.injectGlobal({
      ":host": {
        display: "block",
        position: "relative",
        overflow: "hidden",
        width: "var(--width)",
        height: "var(--height)",
      },
    })

    this.resize()
    this.render()
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
      this.resize()
    }
  }

  resize(): void {
    const width = this.width
    const height = this.height

    this.emotion.injectGlobal({
      ":host": {
        "--width": width ? `${width}px` : "100vw",
        "--height": height ? `${height}px` : "100vh",
      },
    })
  }

  render(): void {
    const classes = {
      widgets: this.emotion.css({
        position: "absolute",
        width: "100%",
        height: "100%",
      }),
    }

    const widgets = document.createElement("div")
    widgets.classList.add(classes.widgets)

    const slot = document.createElement("slot")
    widgets.append(slot)

    this.root.append(widgets)
  }
}

window.customElements.define("overlaysymphony-scene", Scene)
