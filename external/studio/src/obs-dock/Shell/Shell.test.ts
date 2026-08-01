import "./Shell.ts"

const tag = "dock-shell"

describe("Shell", () => {
  it("registers dock-shell", () => {
    expect(customElements.get(tag)).toBeTypeOf("function")
  })

  it("renders four tabs and switches the active pane", () => {
    const shell = document.createElement(tag)
    document.body.append(shell)

    const root = shell.shadowRoot
    expect(root).not.toBeNull()

    const tabs = root?.querySelectorAll<HTMLButtonElement>(".tab")
    expect(tabs).toHaveLength(4)

    const body = root?.querySelector(".body")
    expect(body?.querySelector("dock-config")).not.toBeNull()

    root?.querySelector<HTMLButtonElement>('[data-tab="events"]')?.click()
    expect(body?.querySelector("dock-config")).toBeNull()

    root?.querySelector<HTMLButtonElement>('[data-tab="config"]')?.click()
    expect(body?.querySelector("dock-config")).not.toBeNull()
  })
})
