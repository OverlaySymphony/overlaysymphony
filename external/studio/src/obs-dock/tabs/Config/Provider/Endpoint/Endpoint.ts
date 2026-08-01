import Component from "#shared/Component"

import stylesheet from "./Endpoint.css" with { type: "css" }

export default class Endpoint extends Component {
  public static name = "dock-config-provider-endpoint"

  constructor() {
    super(stylesheet)
  }
}

window.customElements.define(Endpoint.name, Endpoint)
