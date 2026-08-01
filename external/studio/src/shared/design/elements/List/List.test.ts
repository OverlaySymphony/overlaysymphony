import List from "./List.ts"

const tag = List.name

describe("List", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots its children", () => {
    const list = document.createElement(tag)
    const first = document.createElement("div")
    const second = document.createElement("div")
    list.append(first, second)
    document.body.append(list)

    const root = list.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toEqual([first, second])
  })
})
