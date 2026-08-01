import "#design/elements/Button"
import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Connection.css" with { type: "css" }

export default class Connection extends Component {
  public static name = "dock-connections-connection"

  static observedAttributes = ["label", "endpoint", "status", "ping"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const label = this.getAttribute("label") ?? ""
    const endpoint = this.getAttribute("endpoint") ?? ""
    const status = this.getAttribute("status") ?? ""
    const ping = this.getAttribute("ping") ?? ""
    const up = status !== "err"

    this.root.innerHTML = `
      <os-dot tone="${status}"></os-dot>

      <span class="detail">
        <span class="label">${label}</span>
        <span class="endpoint">${endpoint}</span>
      </span>

      <span class="ping">${up ? ping : "down"}</span>

      <os-button variant="ghost">${up ? "Reconnect" : "Retry"}</os-button>
    `
  }
}

window.customElements.define(Connection.name, Connection)
