export type Navigation = {
  label: string
  href: string
}

export type Breadcrumb = {
  minor?: boolean
  label?: string
  href?: string
  navigation?: Navigation[]
}

type Structure = {
  root?: Breadcrumb
  section?: Breadcrumb
  page?: Breadcrumb
  title: string
  breadcrumbs: Breadcrumb[]
}

export function getStructure(breadcrumbs: Breadcrumb[]): Structure {
  const structure: Structure = {
    root: undefined,
    section: undefined,
    page: undefined,
    title: "",
    breadcrumbs,
  }

  if (breadcrumbs.length >= 1) {
    structure.root = breadcrumbs[0]
  }

  if (breadcrumbs.length >= 2) {
    structure.section = breadcrumbs[1]
  }

  const pageIndex = breadcrumbs.length - 1
  structure.page = breadcrumbs[pageIndex]

  const titleParts = breadcrumbs.slice().reverse()
  if (structure.page?.minor) {
    titleParts.unshift(structure.page)
  }

  structure.title = titleParts.map(({ label }) => label).join(" - ")

  return structure
}

export function getMatch(
  navigation: Navigation[],
  page: string,
): Navigation | undefined {
  if (page.endsWith("/")) page = page.slice(0, -1)

  const matches = navigation.filter(({ href }) => href && page.startsWith(href))
  if (matches.length === 0) return undefined
  if (matches.length === 1) return matches[0]

  const reduced = matches.filter(({ href }) => href === page)
  if (reduced.length === 0) return matches[0]

  return reduced[0]
}
