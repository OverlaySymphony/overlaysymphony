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
})
