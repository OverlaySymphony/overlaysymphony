import Event from "./Event.ts"

const tag = Event.name

function render(attributes: Record<string, string>): HTMLElement {
  const event = document.createElement(tag)

  for (const [name, value] of Object.entries(attributes)) {
    event.setAttribute(name, value)
  }

  document.body.append(event)

  return event
}

const entry = { time: "20:14:02", source: "ALERTS", status: "ok" }

describe("Event", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its time, source, and status", () => {
    const root = render(entry).shadowRoot!

    expect(root.querySelector(".time")?.textContent).toBe("20:14:02")
    expect(root.querySelector(".source")?.textContent).toBe("ALERTS")
    expect(root.querySelector(".status")?.textContent).toBe("ok")
  })

  it("slots the message into its body", () => {
    const event = render(entry)
    event.append(`overlay.fire("welcome")`)

    const slot = event.shadowRoot!.querySelector<HTMLSlotElement>(".what slot")
    expect(slot).not.toBeNull()
    expect(slot?.assignedNodes()).toHaveLength(1)
  })

  it("takes the dot tone straight from its status", () => {
    for (const status of ["ok", "warn", "err"]) {
      const root = render({ ...entry, status }).shadowRoot!

      expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe(status)
    }
  })

  it("re-renders when its status changes", () => {
    const event = render(entry)
    const root = event.shadowRoot!

    event.setAttribute("status", "err")

    expect(root.querySelector(".status")?.textContent).toBe("err")
    expect(root.querySelector("os-dot")?.getAttribute("tone")).toBe("err")
  })

  it("upgrades the components it composes", () => {
    const root = render(entry).shadowRoot!

    expect(root.querySelector("os-dot")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
