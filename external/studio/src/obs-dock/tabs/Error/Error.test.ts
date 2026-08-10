import Error from "./Error.ts"

const tag = Error.name

function render(): ShadowRoot {
  const Error = document.createElement(tag)
  document.body.append(Error)

  const root = Error.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("Error", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its message", () => {
    expect(render().querySelector(".message")?.textContent).toBe("")
  })

  it("upgrades the components it composes", () => {
    expect(render().querySelector("os-dot")?.shadowRoot).toBeInstanceOf(
      ShadowRoot,
    )
  })
})
