import Loading from "./Loading.ts"

const tag = Loading.name

function render(): ShadowRoot {
  const loading = document.createElement(tag)
  document.body.append(loading)

  const root = loading.shadowRoot
  expect(root).not.toBeNull()

  return root!
}

describe("Loading", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders its message", () => {
    expect(render().querySelector(".message")?.textContent).toBe("Loading…")
  })

  it("upgrades the components it composes", () => {
    expect(render().querySelector("os-dot")?.shadowRoot).toBeInstanceOf(
      ShadowRoot,
    )
  })
})
