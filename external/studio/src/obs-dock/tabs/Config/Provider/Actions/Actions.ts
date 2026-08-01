import Component from "#shared/Component"

import stylesheet from "./Actions.css" with { type: "css" }

export default class Actions extends Component {
  public static name = "dock-config-provider-actions"

  constructor() {
    super(stylesheet)
  }
}

window.customElements.define(Actions.name, Actions)
