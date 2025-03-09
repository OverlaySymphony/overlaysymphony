import {
  clearCachedAuthentication,
  getAuthentication,
  popupAuthentication,
} from "../authentication/index.js"

declare global {
  interface Window {
    overlaysymphonyTwitchScopes?: string[]
  }
}

export class TwitchAuthentication extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["client-id", "scopes-key", "popup-url"]
  }

  root: ShadowRoot
  element?: HTMLElement

  constructor() {
    super()

    const stylesheet = new CSSStyleSheet()

    stylesheet.insertRule(`
      :host {
        display: block;
      }
    `)

    stylesheet.insertRule(`
      .authenticating, .validating, .authenticated, .unauthenticated {
        display: block;
        box-sizing: border-box;
        width: 100%;

        color: #ffffff;
        border-radius: 4px;

        font-size: 20px;
        line-height: 18px;
        padding: 8px 13px;
        text-align: center;
        font-family: sans-serif;
      }
    `)

    stylesheet.insertRule(`
      .authenticating, .validating {
        background: #949494;
        border: 2px solid transparent;
      }
    `)

    stylesheet.insertRule(`
      .authenticated {
        background: #AC75FF;
        border: 2px solid transparent;
      }
    `)

    stylesheet.insertRule(`
      .unauthenticated {
        background: #9146FF;
        border: 2px outset buttonBorder;
      }
    `)

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.render()
  }

  get clientId(): string {
    return this.getAttribute("client-id") ?? ""
  }

  get scopes(): string[] {
    const key = (this.getAttribute("scopes-key") ??
      "overlaysymphonyTwitchScopes") as "overlaysymphonyTwitchScopes"

    return window[key] ?? []
  }

  get popupUrl(): string {
    const parent = window.location.href
    const end = parent.lastIndexOf("/")
    const baseURL = window.location.href.slice(0, end)

    return this.getAttribute("popup-url") ?? `${baseURL}/popup-twitch.html`
  }

  async authenticate(): Promise<void> {
    this.renderAuthenticating()

    await popupAuthentication(this.clientId, this.scopes, this.popupUrl)

    return this.render()
  }

  async unauthenticate(): Promise<void> {
    clearCachedAuthentication()

    return this.render()
  }

  clear(): void {
    if (this.element) {
      this.element.remove()
      this.element = undefined
    }
  }

  renderAuthenticating(): void {
    this.clear()

    this.element = document.createElement("div")
    this.element.classList.add("authenticating")
    this.element.innerText = "Authenticating..."

    this.root.append(this.element)
  }

  renderValidating(): void {
    this.clear()

    this.element = document.createElement("div")
    this.element.classList.add("validating")
    this.element.innerText = "Validating..."

    this.root.append(this.element)
  }

  renderAuthenticated(): void {
    this.clear()

    this.element = document.createElement("button")
    this.element.classList.add("authenticated")
    this.element.innerText = "Authenticated"
    this.root.append(this.element)

    this.element.addEventListener("click", () => this.unauthenticate())
  }

  renderUnauthenticated(): void {
    this.clear()

    this.element = document.createElement("button")
    this.element.classList.add("unauthenticated")
    this.element.innerText = "Authenticate with Twitch"
    this.root.append(this.element)

    this.element.addEventListener("click", () => this.authenticate())
  }

  async render(): Promise<void> {
    this.renderValidating()

    const authentication = await getAuthentication(this.scopes)
    if (authentication) {
      this.renderAuthenticated()
    } else {
      this.renderUnauthenticated()
    }
  }
}

window.customElements.define(
  "overlaysymfony-twitch-authentication",
  TwitchAuthentication,
)
