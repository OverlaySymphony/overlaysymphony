import "#design/elements/Dot"

import Component from "#shared/Component"

import stylesheet from "./Event.css" with { type: "css" }

export default class Event extends Component {
  public static name = "dock-events-event"

  static observedAttributes = ["time", "source", "status"]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    const time = this.getAttribute("time") ?? ""
    const source = this.getAttribute("source") ?? ""
    const status = this.getAttribute("status") ?? ""

    this.root.innerHTML = `
      <os-dot tone="${status}"></os-dot>
      <span class="time">${time}</span>
      <span class="source">${source}</span>
      <span class="what"><slot></slot></span>
      <span class="status">${status}</span>
    `
  }
}

window.customElements.define(Event.name, Event)
