import "#design/elements/Dot"

import tones from "#design/tones.css" with { type: "css" }
import Component from "#shared/Component"

import stylesheet from "./Event.css" with { type: "css" }

export default class Event extends Component {
  public static name = "dock-events-event"

  static observedAttributes = ["time", "source", "tone"]

  constructor() {
    super(tones, stylesheet)
  }

  protected build(): void {
    const time = this.getAttribute("time") ?? ""
    const source = this.getAttribute("source") ?? ""
    const tone = this.getAttribute("tone") ?? ""

    this.root.innerHTML = `
      <os-dot tone="${tone}"></os-dot>
      <span class="time">${time}</span>
      <span class="source">${source}</span>
      <span class="what"><slot></slot></span>
      <span class="status">${tone}</span>
    `
  }
}

window.customElements.define(Event.name, Event)
