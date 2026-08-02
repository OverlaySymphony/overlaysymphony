import tones from "#design/tones.css" with { type: "css" }
import Component from "#shared/Component"

import stylesheet from "./Dot.css" with { type: "css" }

export default class Dot extends Component {
  public static name = "os-dot"

  constructor() {
    super(tones, stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = ""
  }
}

window.customElements.define(Dot.name, Dot)
