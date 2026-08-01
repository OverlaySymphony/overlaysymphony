import Note from "./Note.ts"

const tag = Note.name

describe("Note", () => {
  it(`registers ${tag}`, () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders a decorative lock beside its slotted text", () => {
    const note = document.createElement(tag)
    note.setAttribute("tone", "ok")
    note.append("Token stored locally")
    document.body.append(note)

    const root = note.shadowRoot
    expect(root).not.toBeNull()

    const lock = root?.querySelector(".lock")
    expect(lock?.getAttribute("aria-hidden")).toBe("true")

    const slot = root?.querySelector("slot")
    expect(slot?.assignedNodes()).toHaveLength(1)
  })
})
