import "../tabs/Config/index.ts"
import "../tabs/Connections/index.ts"
import "../tabs/Events/index.ts"
import "../tabs/State/index.ts"

import Component from "#shared/Component"

import pkg from "../../../package.json" with { type: "json" }

import stylesheet from "./Shell.css" with { type: "css" }

const tabConfigs = {
  config: { label: "Config", element: "dock-config" },
  events: { label: "Events", element: "dock-events" },
  state: { label: "State", element: "dock-state" },
  connections: { label: "Connections", element: "dock-connections" },
} satisfies Record<string, { label: string; element: string }>

type Tab = keyof typeof tabConfigs

const tabOrder: Tab[] = ["config", "events", "state", "connections"]

export default class Shell extends Component {
  public static name = "dock-shell"

  private tabEls!: NodeListOf<HTMLButtonElement>
  private bodyEl!: HTMLDivElement

  private active: Tab = tabOrder[0]

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <header class="head">
        <span class="logo" aria-hidden="true"></span>
        <span class="name">Overlay <strong>Symphony</strong></span>
        <span class="version">v${pkg.version}</span>
      </header>

      <nav class="tabs" role="tablist">
        ${tabOrder
          .map(
            (id) =>
              `<button class="tab" role="tab" data-tab="${id}">${tabConfigs[id].label}</button>`,
          )
          .join("")}
      </nav>

      <div class="body"></div>
    `

    this.tabEls = this.root.querySelectorAll(".tab")
    this.bodyEl = this.root.querySelector(".body")!
    if (!this.bodyEl) throw new Error("Oops!")

    for (const button of this.tabEls) {
      button.addEventListener("click", () => {
        this.active = button.dataset.tab as Tab
        this.render()
      })
    }

    this.render()
  }

  private render() {
    for (const tab of this.tabEls) {
      tab.classList.toggle("active", tab.dataset.tab === this.active)
    }

    this.bodyEl.innerHTML = `<${tabConfigs[this.active].element}></${tabConfigs[this.active].element}>`
  }
}

window.customElements.define(Shell.name, Shell)
