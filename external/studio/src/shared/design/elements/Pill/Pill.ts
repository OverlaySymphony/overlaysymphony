import Component from "#shared/Component"

import stylesheet from "./Pill.css" with { type: "css" }

export default class Pill extends Component {
  public static name = "os-pill"

  constructor() {
    super(stylesheet)
  }
}

window.customElements.define(Pill.name, Pill)
