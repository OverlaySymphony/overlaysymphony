import "#design/elements/Button"
import "#design/elements/Label"
import "#design/elements/List"
import "#design/elements/Note"

import "./Event/index.ts"

import Component from "#shared/Component"

import stylesheet from "./Events.css" with { type: "css" }

export default class Events extends Component {
  public static name = "dock-events"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-label>
        Event feed · live
        <os-button slot="aside" variant="text">Clear</os-button>
      </os-label>

      <os-list>
        <dock-events-event time="20:14:02" source="ALERTS" tone="ok">
          overlay.fire("welcome")
        </dock-events-event>

        <dock-events-event time="20:14:02" source="ALERTS" tone="ok">
          audio.tts(elevenlabs)
        </dock-events-event>

        <dock-events-event time="20:13:48" source="ALERTS" tone="warn">
          trigger · Channel.Follow
        </dock-events-event>

        <dock-events-event time="20:12:31" source="COMMANDS" tone="err">
          chat.reply (rate-limited)
        </dock-events-event>

        <dock-events-event time="20:11:09" source="BACKGRND" tone="ok">
          timer.every(60s)
        </dock-events-event>

        <dock-events-event time="20:10:55" source="COMMANDS" tone="ok">
          trigger · Chat.!so
        </dock-events-event>
      </os-list>

      <span class="spacer"></span>

      <os-note tone="ok">Last 200 events saved. Click row for full payload.</os-note>
    `
  }
}

window.customElements.define(Events.name, Events)
