import { BareAuthentication, validateAuthentication } from "../authentication"

declare global {
  interface Window {
    overlaysymphonyTwitchScopes: string[]
  }
}

const localStorageKey = "overlaysymphony:service:twitch"

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
      button, .authenticating, .validating, .authenticated {
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
      button {
        background: #9146FF;
        border: 2px outset buttonBorder;
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

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.render()
  }

  get clientId(): string {
    return this.getAttribute("client-id") ?? ""
  }

  get scopes(): string[] {
    const key = (this.getAttribute("scopes-key") ??
      "overlaysymphonyTwitchScopes") as "overlaysymphonyTwitchScopes"

    return window[key] || []
  }

  get popupUrl(): string {
    return (
      this.getAttribute("popupUrl") ??
      // "https://overlaysymphony.github.io/overlaysymphony/popup-twitch.html"
      "https://yettiexplores.github.io/overlaysymphony-config/popup-twitch.html"
    )
  }

  async authenticate(): Promise<void> {
    this.renderAuthenticating()

    const url = new URL(
      `${this.popupUrl}?scopes=${this.scopes.join("+")}&clientId=${this.clientId}`,
    )

    await new Promise<void>((resolve) => {
      const listener = (event: MessageEvent) => {
        if (event.origin !== url.origin) return

        // const source = (event.source as Window | null)?.name
        // if (source !== "OverlaySymphonyTwitchAuthenticationPopup") return

        const { type, authentication } = event.data
        if (type !== "authentication") return

        window.removeEventListener("message", listener)

        setCached(authentication)
        this.render()
        resolve()
      }

      window.addEventListener("message", listener)

      window.open(
        url,
        "OverlaySymphonyTwitchAuthenticationPopup",
        "width=520,height=840",
      )
    })
  }

  async validate(authentication: BareAuthentication): Promise<void> {
    this.renderValidating()

    try {
      await validateAuthentication(authentication)
      this.renderAuthenticated()
    } catch (e) {
      clearCached()
      this.render()
    }
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

    this.element = document.createElement("div")
    this.element.classList.add("authenticated")
    this.element.innerText = "Authenticated"

    this.root.append(this.element)
  }

  renderUnauthenticated(): void {
    this.clear()

    this.element = document.createElement("button")
    this.element.innerText = "Authenticate with Twitch"
    this.root.append(this.element)

    this.element.addEventListener("click", () => this.authenticate())
  }

  render(): void {
    const cached = getCached(this.scopes)

    if (cached) {
      this.validate(cached)
    } else {
      this.renderUnauthenticated()
    }
  }
}

window.customElements.define(
  "overlaysymfony-twitch-authentication",
  TwitchAuthentication,
)

export function getCached(scopes: string[]): BareAuthentication | undefined {
  const cache = localStorage.getItem(localStorageKey)
  if (cache) {
    const authentication = JSON.parse(cache) as BareAuthentication
    authentication.expires = new Date(authentication.expires)

    for (const scope of scopes) {
      if (!authentication.scope.includes(scope)) {
        localStorage.removeItem(localStorageKey)
        return undefined
      }
    }

    return authentication
  }

  return undefined
}

export function setCached(authentication: BareAuthentication): void {
  localStorage.setItem(localStorageKey, JSON.stringify(authentication))
}

export function clearCached(): void {
  localStorage.removeItem(localStorageKey)
}
