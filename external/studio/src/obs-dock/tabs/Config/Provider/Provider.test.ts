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
    const root = render({ label: "Twitch", status: "connected" }).shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("Twitch")
    expect(root.querySelector(".status")?.textContent).toBe("connected")
  })

  it("lights the dot only when connected", () => {
    expect(
      render({ label: "Twitch", status: "connected" })
        .shadowRoot!.querySelector("os-dot")
        ?.getAttribute("tone"),
    ).toBe("ok")

    expect(
      render({ label: "OBS", status: "notset" })
        .shadowRoot!.querySelector("os-dot")
        ?.getAttribute("tone"),
    ).toBe("off")
  })

  it("re-renders when its status changes", () => {
    const provider = render({ label: "OBS", status: "notset" })
    const root = provider.shadowRoot!

    provider.setAttribute("status", "connected")

    expect(root.querySelector(".status")?.textContent).toBe("connected")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe("ok")
  })

  it("keeps slotting its children across a re-render", () => {
    const provider = render({ label: "OBS", status: "notset" })
    const child = document.createElement("dock-config-provider-endpoint")
    provider.append(child)

    provider.setAttribute("status", "connected")

    const slot = provider.shadowRoot!.querySelector("slot")
    expect(slot?.assignedNodes()).toEqual([child])
  })

  it("renders empty when its attributes are absent", () => {
    const root = render({}).shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe("off")
  })

  it("upgrades the components it composes", () => {
    const root = render({ label: "Twitch", status: "connected" }).shadowRoot!

    expect(root.querySelector("os-dot")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
