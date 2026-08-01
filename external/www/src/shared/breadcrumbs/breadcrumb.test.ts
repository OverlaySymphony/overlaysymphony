import { type Navigation, getMatch, getStructure } from "./breadcrumb"

const root = { label: "Overlay Symphony", href: "/" }
const section = { label: "Modules", href: "/modules" }
const page = { label: "Twitch", href: "/modules/twitch" }

const navigation: Navigation[] = [
  { label: "Features", href: "/features" },
  { label: "Modules", href: "/modules" },
  { label: "Open Editor", href: "/editor", cta: true },
]

describe("getStructure", () => {
  it("leaves every tier empty for an empty trail", () => {
    const structure = getStructure([])

    expect(structure.root).toBeUndefined()
    expect(structure.section).toBeUndefined()
    expect(structure.page).toBeUndefined()
    expect(structure.title).toBeUndefined()
  })

  it("treats a lone breadcrumb as both root and page", () => {
    const structure = getStructure([root])

    expect(structure.root).toBe(root)
    expect(structure.section).toBeUndefined()
    expect(structure.page).toBe(root)
    expect(structure.title).toBe("Overlay Symphony")
  })

  it("separates the site name with a pipe and the rest with dashes", () => {
    expect(getStructure([root, section]).title).toBe(
      "Modules | Overlay Symphony",
    )
    expect(getStructure([root, section, page]).title).toBe(
      "Twitch - Modules | Overlay Symphony",
    )
  })

  it("treats the second of two as both section and page", () => {
    const structure = getStructure([root, section])

    expect(structure.root).toBe(root)
    expect(structure.section).toBe(section)
    expect(structure.page).toBe(section)
  })

  it("assigns each tier and titles the trail innermost first", () => {
    const structure = getStructure([root, section, page])

    expect(structure.root).toBe(root)
    expect(structure.section).toBe(section)
    expect(structure.page).toBe(page)
    expect(structure.title).toBe("Twitch - Modules | Overlay Symphony")
  })

  it("takes the page from the end of a trail deeper than three", () => {
    const deep = { label: "Events", href: "/modules/twitch/events" }
    const structure = getStructure([root, section, page, deep])

    expect(structure.section).toBe(section)
    expect(structure.page).toBe(deep)
    expect(structure.title).toBe("Events - Twitch - Modules | Overlay Symphony")
  })

  it("keeps a minor page current, out of the trail, and leading the title", () => {
    const notFound = { label: "Not found", href: "/404", minor: true }
    const structure = getStructure([root, section, notFound])

    expect(structure.page).toBe(notFound)
    expect(structure.root).toBe(root)
    expect(structure.section).toBe(section)
    expect(structure.breadcrumbs).toEqual([root, section])
    expect(structure.title).toBe("Not found - Modules | Overlay Symphony")
  })

  it("drops a minor crumb we have navigated past, title included", () => {
    const interstitial = { label: "Redirecting", minor: true }
    const structure = getStructure([root, interstitial, section])

    expect(structure.breadcrumbs).toEqual([root, section])
    expect(structure.section).toBe(section)
    expect(structure.title).toBe("Modules | Overlay Symphony")
  })

  it("leaves the caller's array untouched", () => {
    const breadcrumbs = [root, section, page]
    getStructure(breadcrumbs)

    expect(breadcrumbs).toEqual([root, section, page])
  })
})

describe("getMatch", () => {
  it("matches an entry exactly", () => {
    expect(getMatch(navigation, "/features")).toBe(navigation[0])
  })

  it("ignores a trailing slash on the page", () => {
    expect(getMatch(navigation, "/features/")).toBe(navigation[0])
  })

  it("matches a nested page against its section", () => {
    expect(getMatch(navigation, "/modules/twitch")).toBe(navigation[1])
  })

  it("returns nothing when no entry matches", () => {
    expect(getMatch(navigation, "/pricing")).toBeUndefined()
  })

  it("returns nothing for the site root, which has no entry", () => {
    expect(getMatch(navigation, "/")).toBeUndefined()
  })

  it("skips entries without an href", () => {
    const withBlank: Navigation[] = [
      { label: "Blank", href: "" },
      ...navigation,
    ]

    expect(getMatch(withBlank, "/features")).toBe(withBlank[1])
  })

  it("prefers the exact entry when several match", () => {
    const nested: Navigation[] = [
      { label: "Modules", href: "/modules" },
      { label: "Twitch", href: "/modules/twitch" },
    ]

    expect(getMatch(nested, "/modules/twitch")).toBe(nested[1])
  })

  it("falls back to the first declared entry when several match inexactly", () => {
    const nested: Navigation[] = [
      { label: "Modules", href: "/modules" },
      { label: "Twitch", href: "/modules/twitch" },
    ]

    expect(getMatch(nested, "/modules/twitch/events")).toBe(nested[0])
  })

  it("matches on string prefix, not on path segment", () => {
    expect(getMatch(navigation, "/features-beta")).toBe(navigation[0])
  })
})
