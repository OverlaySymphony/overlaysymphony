import Actions from "./Actions.ts"

const tag = Actions.name

describe("Actions", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots the controls it is given", () => {
    const actions = document.createElement(tag)
    const button = document.createElement("os-button")
    actions.append(button)
    document.body.append(actions)

    const slot = actions.shadowRoot?.querySelector<HTMLSlotElement>("slot")
    expect(slot?.assignedElements()).toEqual([button])
  })
})
