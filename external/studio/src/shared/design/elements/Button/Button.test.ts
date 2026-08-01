import Button from "./Button.ts"

const tag = Button.name

describe("Button", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders a button around its slotted label", () => {
    const button = document.createElement(tag)
    button.textContent = "Connect"
    document.body.append(button)

    const root = button.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector<HTMLSlotElement>("button > slot")
    expect(slot).not.toBeNull()
    expect(slot?.assignedNodes()).toHaveLength(1)
  })
})
