import State from "./State.ts"

const tag = State.name

function render(): ShadowRoot {
  const state = document.createElement(tag)
  document.body.append(state)

  const root = state.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("State", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("lists a store per key, with its scope and value", () => {
    const stores = render().querySelectorAll("os-list dock-state-store")
    expect(stores).toHaveLength(5)

    expect(
      Array.from(stores, (store) => [
        store.getAttribute("key"),
        store.getAttribute("scope"),
      ]),
    ).toEqual([
      ["shoutout.queue", "session"],
      ["vote.gameNext", "session"],
      ["user.lastSeen.cb", "forever"],
      ["stream.title", "session"],
      ["overlay.muted", "user"],
    ])

    for (const store of stores) {
      expect(store.textContent?.trim()).not.toBe("")
    }
  })

  it("counts its keys in the label", () => {
    const root = render()
    const stores = root.querySelectorAll("dock-state-store")

    expect(root.querySelector("os-label")?.textContent).toContain(
      `${stores.length} keys`,
    )
  })

  it("upgrades the components it composes", () => {
    const root = render()

    expect(root.querySelector("os-list")?.shadowRoot).toBeInstanceOf(ShadowRoot)
    expect(root.querySelector("dock-state-store")?.shadowRoot).toBeInstanceOf(
      ShadowRoot,
    )
  })
})
