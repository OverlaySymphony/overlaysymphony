import Component from "#shared/Component"

import stylesheet from "./Note.css" with { type: "css" }

export default class Note extends Component {
  public static name = "os-note"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <span class="lock" aria-hidden="true"></span>
      <slot></slot>
    `
  }
}

window.customElements.define(Note.name, Note)
