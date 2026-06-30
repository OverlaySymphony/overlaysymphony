export type Child = string | number | false | null | undefined | Child[]

export type Token = {
  tag: string
  props?: {}
  children: Array<Token | string | undefined>
}

export function tokenize(input: Child | undefined): Token["children"] {
  if (!input) return []

  if (!Array.isArray(input)) input = [input]

  input = (
    (input as unknown[]).flat(Infinity) as Array<
      string | number | false | null | undefined
    >
  )
    .map((value) => (typeof value === "number" ? `${value}` : value))
    .filter((value) => typeof value === "string")
    .join("")

  for (const { patterns, handle } of matchers) {
    for (const pattern of patterns) {
      const match = input.match(pattern)
      if (match) {
        if (typeof handle === "function") {
          return handle(match)
        }

        const tag = typeof handle === "string" ? handle : handle[0]
        const props = typeof handle === "string" ? undefined : handle[1]

        return [
          ...tokenize(match[1]),
          {
            tag,
            props,
            children: tokenize(match[2]),
          },
          ...tokenize(match[3]),
        ]
      }
    }
  }

  return [input]
}

const matchers: Array<{
  patterns: RegExp[]
  handle:
    | string
    | [string, NonNullable<Token["props"]>]
    | ((match: Array<string | undefined>) => Token["children"])
}> = [
  {
    patterns: [
      /^(.*?[^a-zA-Z])??\*\*(.*?)\*\*([^a-zA-Z].*)??$/,
      /^(.*?[^a-zA-Z])??__(.*?)__([^a-zA-Z].*)??$/,
    ],
    handle: "strong",
  },
  {
    patterns: [
      /^(.*?[^a-zA-Z])??\*(.*?)\*([^a-zA-Z].*)??$/,
      /^(.*?[^a-zA-Z])??_(.*?)_([^a-zA-Z].*)??$/,
    ],
    handle: "em",
  },
  {
    patterns: [/^(.*?[^a-zA-Z])??`(.*?)`([^a-zA-Z].*)??$/],
    handle: ["code", { className: "inline" }],
  },
  {
    patterns: [/^(.*?[^a-zA-Z])??~~(.*?)~~([^a-zA-Z].*)??$/],
    handle: ["s", {}],
  },
  {
    patterns: [/\[(.+?)\]\((.+?)\)/],
    handle: ([, label, url]) => [
      {
        tag: "a",
        props: {
          href: url,
          target: "_blank",
          rel: "noreferrer",
        },
        children: tokenize(label),
      },
    ],
  },
]

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function isTokenizable(input: Child | unknown): input is Child {
  if (input === false || input === null) return true
  if (typeof input === "undefined") return true
  if (typeof input === "string") return true
  if (typeof input === "number") return true

  if (Array.isArray(input)) {
    return input.every((child) => isTokenizable(child))
  }

  return false
}
