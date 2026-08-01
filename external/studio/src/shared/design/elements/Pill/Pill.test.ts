import Pill from "./Pill.ts"

const tag = Pill.name

describe("Pill", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots its children", () => {
    const pill = document.createElement(tag)
    pill.append("Live")
    document.body.append(pill)

    const root = pill.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toHaveLength(1)
  })
})
