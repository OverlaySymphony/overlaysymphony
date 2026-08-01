import Alert from "./Alert.ts"

const tag = Alert.name

function render(label = "New follower"): HTMLElement {
  const alert = document.createElement(tag)
  alert.setAttribute("label", label)
  document.body.append(alert)

  return alert
}

describe("Alert", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its label", () => {
    const root = render().shadowRoot!

    expect(root.querySelector(".label")?.textContent).toBe("New follower")
  })

  it("renders a severity eyebrow only when it is given one", () => {
    expect(render().shadowRoot!.querySelector(".severity")).toBeNull()

    const alert = render()
    alert.setAttribute("severity", "Unrecoverable")

    expect(alert.shadowRoot!.querySelector(".severity")?.textContent).toBe(
      "Unrecoverable",
    )
  })

  it("re-renders when its label changes", () => {
    const alert = render()

    alert.setAttribute("label", "Raid incoming")

    expect(alert.shadowRoot!.querySelector(".label")?.textContent).toBe(
      "Raid incoming",
    )
  })

  it("contains slotted content in its body", () => {
    const alert = render()
    alert.append("chrisbaker just followed")

    const slot = alert.shadowRoot!.querySelector<HTMLSlotElement>(".body slot")
    expect(slot).not.toBeNull()
    expect(slot?.assignedNodes()).toHaveLength(1)
  })

  it("takes actions through a slot of their own, and works without them", () => {
    const bare = render()
    const actions = bare.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="actions"]',
    )
    expect(actions?.assignedElements()).toHaveLength(0)

    const alert = render()
    const row = document.createElement("composition-alert-actions")
    row.setAttribute("slot", "actions")
    alert.append(row)

    expect(
      alert
        .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="actions"]')
        ?.assignedElements(),
    ).toEqual([row])
  })

  it("upgrades the components it composes", () => {
    const root = render().shadowRoot!

    expect(root.querySelector("os-dot")?.shadowRoot).toBeInstanceOf(ShadowRoot)
  })
})
