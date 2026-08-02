import Dot from "./Dot.ts"

const tag = Dot.name

describe("Dot", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders nothing, taking its tone from the host", () => {
    const dot = document.createElement(tag)
    dot.setAttribute("tone", "ok")
    document.body.append(dot)

    const root = dot.shadowRoot
    expect(root).not.toBeNull()
    expect(root?.childNodes).toHaveLength(0)
  })

  it("adopts the shared tone mapping alongside its own styles", () => {
    const dot = document.createElement(tag)
    document.body.append(dot)

    expect(dot.shadowRoot!.adoptedStyleSheets).toHaveLength(2)
  })

  it("stays a real element when given no tone", () => {
    const dot = document.createElement(tag)
    document.body.append(dot)

    expect(dot.hasAttribute("tone")).toBe(false)
    expect(dot.shadowRoot).not.toBeNull()
  })
})
