import Component from "#shared/Component"

import stylesheet from "./List.css" with { type: "css" }

export default class List extends Component {
  public static name = "os-list"

  constructor() {
    super(stylesheet)
  }
}

window.customElements.define(List.name, List)
