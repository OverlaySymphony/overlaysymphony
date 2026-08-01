import Actions from "./Actions.ts"

const tag = Actions.name

describe("Actions", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots its children", () => {
    const actions = document.createElement(tag)
    const button = document.createElement("os-button")
    actions.append(button)
    document.body.append(actions)

    const root = actions.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toEqual([button])
  })
})
