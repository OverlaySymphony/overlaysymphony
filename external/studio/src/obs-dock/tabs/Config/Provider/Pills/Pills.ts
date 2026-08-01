import Component from "#shared/Component"

import stylesheet from "./Pills.css" with { type: "css" }

export default class Pills extends Component {
  public static name = "dock-config-provider-pills"

  constructor() {
    super(stylesheet)
  }
}

window.customElements.define(Pills.name, Pills)
