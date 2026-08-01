import Pills from "./Pills.ts"

const tag = Pills.name

describe("Pills", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots its children", () => {
    const pills = document.createElement(tag)
    const first = document.createElement("os-pill")
    const second = document.createElement("os-pill")
    pills.append(first, second)
    document.body.append(pills)

    const root = pills.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toEqual([first, second])
  })
})
