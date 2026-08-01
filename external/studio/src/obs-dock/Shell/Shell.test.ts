import Shell from "./Shell.ts"

const tag = Shell.name

describe("Shell", () => {
  it(`registers ${tag}`, () => {
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

  it("renders the loading pane in place of the active tab", () => {
    const shell = document.createElement(tag)
    shell.setAttribute("loading", "")
    document.body.append(shell)

    const body = shell.shadowRoot?.querySelector(".body")
    expect(body?.querySelector("dock-loading")).not.toBeNull()
    expect(body?.querySelector("dock-config")).toBeNull()
  })

  it("swaps the loading pane in and out, keeping the active tab", () => {
    const shell = document.createElement(tag)
    document.body.append(shell)

    const root = shell.shadowRoot!
    root.querySelector<HTMLButtonElement>('[data-tab="state"]')?.click()

    shell.setAttribute("loading", "")
    expect(root.querySelector(".body dock-loading")).not.toBeNull()

    shell.removeAttribute("loading")
    expect(root.querySelector(".body dock-loading")).toBeNull()
    expect(root.querySelector(".body dock-state")).not.toBeNull()
  })
})
