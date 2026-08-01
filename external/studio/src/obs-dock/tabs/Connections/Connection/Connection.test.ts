import Connection from "./Connection.ts"

const tag = Connection.name

function render(attributes: Record<string, string>): HTMLElement {
  const connection = document.createElement(tag)

  for (const [name, value] of Object.entries(attributes)) {
    connection.setAttribute(name, value)
  }

  document.body.append(connection)

  return connection
}

const up = { label: "Twitch · Chat", endpoint: "irc.chat.twitch.tv:443" }

describe("Connection", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its label, endpoint, and ping when the link is up", () => {
    const root = render({ ...up, status: "ok", ping: "22ms" }).shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("Twitch · Chat")
    expect(root.querySelector(".endpoint")?.textContent).toBe(
      "irc.chat.twitch.tv:443",
    )
    expect(root.querySelector(".ping")?.textContent).toBe("22ms")
    expect(root.querySelector("os-button")?.textContent).toBe("Reconnect")
  })

  it("reports down and offers a retry when the link has errored", () => {
    const root = render({ ...up, status: "err", ping: "22ms" }).shadowRoot!

    expect(root.querySelector(".ping")?.textContent).toBe("down")
    expect(root.querySelector("os-button")?.textContent).toBe("Retry")
  })

  it("keeps a warning link up, reporting its ping", () => {
    const root = render({ ...up, status: "warn", ping: "22ms" }).shadowRoot!

    expect(root.querySelector(".ping")?.textContent).toBe("22ms")
    expect(root.querySelector("os-button")?.textContent).toBe("Reconnect")
  })

  it("takes the dot tone straight from its status", () => {
    for (const status of ["ok", "warn", "err"]) {
      const root = render({ ...up, status }).shadowRoot!

      expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe(status)
    }
  })

  it("re-renders when the link drops", () => {
    const connection = render({ ...up, status: "ok", ping: "22ms" })
    const root = connection.shadowRoot!

    expect(root.querySelector(".ping")?.textContent).toBe("22ms")

    connection.setAttribute("status", "err")

    expect(root.querySelector(".ping")?.textContent).toBe("down")
    expect(root.querySelector("os-button")?.textContent).toBe("Retry")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe("err")
  })

  it("upgrades the components it composes", () => {
    const root = render({ ...up, status: "ok", ping: "22ms" }).shadowRoot!

    expect(root.querySelector("os-dot")?.shadowRoot).toBeInstanceOf(ShadowRoot)
    expect(root.querySelector("os-button")?.shadowRoot).toBeInstanceOf(
      ShadowRoot,
    )
  })
})
