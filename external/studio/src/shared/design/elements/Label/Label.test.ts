import Label from "./Label.ts"

const tag = Label.name

describe("Label", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("assigns children to the default and aside slots", () => {
    const label = document.createElement(tag)
    label.append("Channel")

    const aside = document.createElement("span")
    aside.slot = "aside"
    label.append(aside)

    document.body.append(label)

    const root = label.shadowRoot
    expect(root).not.toBeNull()

    const slots = root?.querySelectorAll<HTMLSlotElement>("slot")
    expect(slots).toHaveLength(2)

    expect(slots?.[0]?.assignedNodes()).toHaveLength(1)
    expect(slots?.[1]?.assignedNodes()).toEqual([aside])
  })
})
