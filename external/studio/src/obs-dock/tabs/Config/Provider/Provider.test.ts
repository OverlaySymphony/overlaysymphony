import Provider from "./Provider.ts"

const tag = Provider.name

function render(attributes: Record<string, string>): HTMLElement {
  const provider = document.createElement(tag)

  for (const [name, value] of Object.entries(attributes)) {
    provider.setAttribute(name, value)
  }

  document.body.append(provider)

  return provider
}

describe("Provider", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its label and status", () => {
    const root = render({
      label: "Twitch",
      status: "connected",
      tone: "ok",
    }).shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("Twitch")
    expect(root.querySelector(".status")?.textContent).toBe("connected")
  })

  it("gives the dot its tone, and none when unset", () => {
    expect(
      render({ label: "Twitch", status: "connected", tone: "ok" })
        .shadowRoot!.querySelector("os-dot")
        ?.getAttribute("tone"),
    ).toBe("ok")

    expect(
      render({ label: "OBS", status: "not set" })
        .shadowRoot!.querySelector("os-dot")
        ?.getAttribute("tone"),
    ).toBeNull()
  })

  it("re-renders when its tone changes", () => {
    const provider = render({ label: "OBS", status: "not set" })
    const root = provider.shadowRoot!

    provider.setAttribute("tone", "ok")
    provider.setAttribute("status", "connected")

    expect(root.querySelector(".status")?.textContent).toBe("connected")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe("ok")
  })

  it("keeps slotting its children across a re-render", () => {
    const provider = render({ label: "OBS", status: "not set" })
    const child = document.createElement("dock-config-provider-endpoint")
    provider.append(child)

    provider.setAttribute("tone", "ok")

    const slot = provider.shadowRoot!.querySelector("slot")
    expect(slot?.assignedNodes()).toEqual([child])
  })

  it("renders empty when its attributes are absent", () => {
    const root = render({}).shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBeNull()
  })

  it("upgrades the components it composes", () => {
    const root = render({
      label: "Twitch",
      status: "connected",
      tone: "ok",
    }).shadowRoot!

    expect(root.querySelector("os-dot")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
