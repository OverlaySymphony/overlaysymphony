import Component from "#shared/Component"

import stylesheet from "./Dot.css" with { type: "css" }

export default class Dot extends Component {
  public static name = "os-dot"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = ""
  }
}

window.customElements.define(Dot.name, Dot)
