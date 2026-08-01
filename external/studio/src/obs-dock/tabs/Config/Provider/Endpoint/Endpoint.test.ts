import Endpoint from "./Endpoint.ts"

const tag = Endpoint.name

describe("Endpoint", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("slots its children", () => {
    const endpoint = document.createElement(tag)
    endpoint.append("ws://localhost:4455")
    document.body.append(endpoint)

    const root = endpoint.shadowRoot
    expect(root).not.toBeNull()

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toHaveLength(1)
  })
})
