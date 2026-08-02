import Events from "./Events.ts"

const tag = Events.name

function render(): ShadowRoot {
  const events = document.createElement(tag)
  document.body.append(events)

  const root = events.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("Events", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("offers a clear action alongside the feed label", () => {
    const clear = render().querySelector("os-label os-button")

    expect(clear?.getAttribute("slot")).toBe("aside")
    expect(clear?.textContent).toBe("Clear")
  })

  it("lists each event with its time, source, and tone", () => {
    const rows = render().querySelectorAll("os-list dock-events-event")
    expect(rows).toHaveLength(6)

    expect(
      Array.from(rows, (row) => [
        row.getAttribute("source"),
        row.getAttribute("tone"),
      ]),
    ).toEqual([
      ["ALERTS", "ok"],
      ["ALERTS", "ok"],
      ["ALERTS", "warn"],
      ["COMMANDS", "err"],
      ["BACKGRND", "ok"],
      ["COMMANDS", "ok"],
    ])

    for (const row of rows) {
      expect(row.getAttribute("time")).toMatch(/^\d\d:\d\d:\d\d$/)
      expect(row.textContent?.trim()).not.toBe("")
    }
  })

  it("orders the feed newest first", () => {
    const times = Array.from(
      render().querySelectorAll("dock-events-event"),
      (row) => row.getAttribute("time") ?? "",
    )

    expect(times).toEqual([...times].sort().reverse())
  })

  it("upgrades the components it composes", () => {
    const root = render()

    expect(root.querySelector("os-list")?.shadowRoot).toBeInstanceOf(ShadowRoot)
    expect(root.querySelector("dock-events-event")?.shadowRoot).toBeInstanceOf(
      ShadowRoot,
    )
    expect(root.querySelector("os-note")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
