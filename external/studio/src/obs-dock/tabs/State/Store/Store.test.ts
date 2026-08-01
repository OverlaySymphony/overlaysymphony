import Store from "./Store.ts"

const tag = Store.name

function render(attributes: Record<string, string>): HTMLElement {
  const store = document.createElement(tag)

  for (const [name, value] of Object.entries(attributes)) {
    store.setAttribute(name, value)
  }

  document.body.append(store)

  return store
}

describe("Store", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its key and carries its scope on the pill", () => {
    const root = render({ key: "shoutout.queue", scope: "session" }).shadowRoot!

    expect(root.querySelector(".key")?.textContent).toBe("shoutout.queue")

    const pill = root.querySelector("os-pill")
    expect(pill?.textContent).toBe("session")
    expect(pill?.getAttribute("variant")).toBe("muted")
  })

  it("slots the value into its body", () => {
    const store = render({ key: "overlay.muted", scope: "user" })
    store.append("false")

    const slot = store.shadowRoot!.querySelector<HTMLSlotElement>(".value slot")
    expect(slot).not.toBeNull()
    expect(slot?.assignedNodes()).toHaveLength(1)
  })

  it("re-renders when its scope changes", () => {
    const store = render({ key: "overlay.muted", scope: "session" })
    const root = store.shadowRoot!

    store.setAttribute("scope", "forever")

    expect(root.querySelector("os-pill")?.textContent).toBe("forever")
    expect(root.querySelector(".key")?.textContent).toBe("overlay.muted")
  })

  it("upgrades the components it composes", () => {
    const root = render({ key: "overlay.muted", scope: "user" }).shadowRoot!

    expect(root.querySelector("os-pill")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
