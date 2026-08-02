import Connections from "./Connections.ts"

const tag = Connections.name

function render(): ShadowRoot {
  const connections = document.createElement(tag)
  document.body.append(connections)

  const root = connections.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("Connections", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("lists every connection with its endpoint and tone", () => {
    const rows = render().querySelectorAll(
      "os-list dock-connections-connection",
    )
    expect(rows).toHaveLength(4)

    expect(
      Array.from(rows, (row) => [
        row.getAttribute("label"),
        row.getAttribute("tone"),
      ]),
    ).toEqual([
      ["Twitch · EventSub", "ok"],
      ["Twitch · Chat", "warn"],
      ["OBS · WebSocket", "err"],
      ["Audio · ElevenLabs", "ok"],
    ])

    for (const row of rows) {
      expect(row.getAttribute("endpoint")).toBeTruthy()
    }
  })

  it("omits the ping on the connection that is down", () => {
    const rows = render().querySelectorAll("dock-connections-connection")

    const down = Array.from(rows).filter(
      (row) => row.getAttribute("tone") === "err",
    )
    expect(down).toHaveLength(1)
    expect(down[0]?.hasAttribute("ping")).toBe(false)

    for (const row of rows) {
      if (row === down[0]) continue
      expect(row.getAttribute("ping")).toMatch(/^\d+ms$/)
    }
  })

  it("upgrades the components it composes", () => {
    const root = render()

    expect(root.querySelector("os-list")?.shadowRoot).toBeInstanceOf(ShadowRoot)
    expect(
      root.querySelector("dock-connections-connection")?.shadowRoot,
    ).toBeInstanceOf(ShadowRoot)
  })
})
