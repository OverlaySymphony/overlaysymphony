import Config from "./Config.ts"

const tag = Config.name

function render(): ShadowRoot {
  const config = document.createElement(tag)
  document.body.append(config)

  const root = config.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("Config", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders a provider per integration, with its status", () => {
    const providers = render().querySelectorAll("dock-config-provider")
    expect(providers).toHaveLength(2)

    expect(
      Array.from(providers, (provider) => [
        provider.getAttribute("label"),
        provider.getAttribute("status"),
      ]),
    ).toEqual([
      ["Twitch", "connected"],
      ["OBS WebSocket", "notset"],
    ])
  })

  it("gives the connected provider an identity, scopes, and re-auth actions", () => {
    const twitch = render().querySelector(
      'dock-config-provider[label="Twitch"]',
    )

    const identity = twitch?.querySelector("dock-config-provider-identity")
    expect(identity?.getAttribute("handle")).toBe("@yourname")
    expect(identity?.getAttribute("meta")).toBe("1.2k followers")

    expect(
      twitch?.querySelectorAll("dock-config-provider-pills os-pill"),
    ).toHaveLength(3)
    expect(
      twitch?.querySelectorAll("dock-config-provider-actions os-button"),
    ).toHaveLength(2)
  })

  it("gives the unconfigured provider an endpoint instead of an identity", () => {
    const obs = render().querySelector(
      'dock-config-provider[label="OBS WebSocket"]',
    )

    expect(
      obs?.querySelector("dock-config-provider-endpoint")?.textContent,
    ).toBe("ws://127.0.0.1:4455")
    expect(obs?.querySelector("dock-config-provider-identity")).toBeNull()

    const actions = obs?.querySelectorAll(
      "dock-config-provider-actions os-button",
    )
    expect(actions).toHaveLength(1)
    expect(actions?.[0]?.textContent).toBe("Connect")
  })

  it("upgrades the components it composes", () => {
    const root = render()

    expect(
      root.querySelector("dock-config-provider")?.shadowRoot,
    ).toBeInstanceOf(ShadowRoot)
    expect(
      root.querySelector("dock-config-provider-identity")?.shadowRoot,
    ).toBeInstanceOf(ShadowRoot)
    expect(root.querySelector("os-note")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
