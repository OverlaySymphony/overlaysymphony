import Identity from "./Identity.ts"

const tag = Identity.name

describe("Identity", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders the handle and meta attributes", () => {
    const identity = document.createElement(tag)
    identity.setAttribute("handle", "@streamer")
    identity.setAttribute("meta", "1.2k followers")
    document.body.append(identity)

    const root = identity.shadowRoot
    expect(root).not.toBeNull()

    expect(root?.querySelector(".handle")?.textContent).toBe("@streamer")
    expect(root?.querySelector(".meta")?.textContent).toBe("1.2k followers")
  })

  it("renders empty when the attributes are absent", () => {
    const identity = document.createElement(tag)
    document.body.append(identity)

    const root = identity.shadowRoot
    expect(root?.querySelector(".handle")?.textContent).toBe("")
    expect(root?.querySelector(".meta")?.textContent).toBe("")
  })
})
