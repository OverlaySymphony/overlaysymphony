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

  it("carries variant and tone as independent attributes", () => {
    const button = document.createElement(tag)
    button.setAttribute("variant", "filled")
    button.setAttribute("tone", "ok")
    document.body.append(button)

    expect(button.getAttribute("variant")).toBe("filled")
    expect(button.getAttribute("tone")).toBe("ok")

    button.removeAttribute("tone")
    expect(button.getAttribute("variant")).toBe("filled")

    expect(button.shadowRoot!.querySelector("button")).not.toBeNull()
  })
})
