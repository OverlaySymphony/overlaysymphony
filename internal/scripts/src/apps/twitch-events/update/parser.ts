import {
  type HTMLElement as ElementNode,
  type Node as NodeBase,
  type TextNode,
  NodeType,
  parse as parseHTML,
} from "node-html-parser"

export type DataNode = {
  id: string
  label: string
  description?: string
  data?: Record<string, Record<string, unknown>>
  children?: DataNode[]
}

export default function parse(raw: string): DataNode {
  const main = parseHTML(raw).querySelector(".main section.text-content")
  if (!main) throw new Error("Unable to parse source.")

  const path: DataNode[] = [
    {
      id: "root",
      label: "Root",
      children: [],
    },
  ]

  for (const child of main.children) {
    if (["BLOCKQUOTE", "DIV"].includes(child.tagName)) continue

    if (child.tagName.match(/H\d/)) {
      const heading = parseHeading(child)
      if (heading.level > path.length) {
        throw new Error("Invalid structure")
      }

      const count = path.length - heading.level
      for (let i = 0; i < count; i++) {
        path.pop()
      }

      const node: DataNode = {
        id: heading.id,
        label: heading.label,
      }

      const current = path[path.length - 1]
      current.children ??= []
      current.children.push(node)
      path.push(node)

      continue
    }

    const current = path[path.length - 1]

    if (["P", "UL", "OL"].includes(child.tagName)) {
      const text = parseText(child)
      if (text) {
        current.description = current.description
          ? `${current.description}\n\n${text}`
          : text
      }

      continue
    }

    if (child.tagName === "TABLE") {
      const table = parseTable(child)

      if (current.data) {
        console.warn("Not replacing data.")
        console.log(current.data)
      } else {
        current.data = table
      }

      continue
    }

    console.log(child.tagName)
  }

  return path[0]
}

export function reduceArrayToObject<Data, Input = Data>(
  rows: Input[],
  getKey: (value: Input, index: number) => string,
  getValue: (
    row: Input,
    index: number,
    key: string,
    data: Record<string, NonNullable<Data>>,
  ) => Data | undefined,
): Record<string, NonNullable<Data>> {
  return rows.reduce((data, row, index) => {
    const key = getKey(row, index)
    const value = getValue(row, index, key, data)

    if (typeof value === "undefined" || value === null) {
      return data
    }

    return { ...data, [key]: value }
  }, {})
}

function parseHeading(element: ElementNode) {
  const match = element.tagName.match(/H(\d)/)
  if (!match) throw new Error("Unable to parse Heading.")

  const text = parseTextish(element.childNodes)
  if (typeof text !== "string") throw new Error("Unable to parse Heading text.")

  return {
    level: +match[1],
    id: element.getAttribute("id") as string,
    label: text,
  }
}

function parseText(element: ElementNode) {
  const text = parseTextish(element)
  if (typeof text !== "string") throw new Error("Unable to parse Text.")

  if (text.startsWith("NOTE")) return

  return text
}

function parseTable(element: ElementNode) {
  if (element.tagName !== "TABLE") throw new Error("Unable to parse Table.")

  const head = parseTableHead(element.children[0])
  const body = parseTableBody(element.children[1])

  const rows = body.map(
    (row) =>
      reduceArrayToObject(
        row,
        (value, index) => head[index],
        (value, index) => {
          if (head[index] === "required" && typeof value === "string") {
            const output = { yes: true, no: false }[value.toLowerCase()]
            if (typeof output !== "undefined") {
              return output
            }
          }

          return value as unknown
        },
      ) as { id: string } & Record<string, unknown>,
  )

  return reduceArrayToObject(
    rows,
    ({ id, ...row }) => {
      if (
        typeof row["subscription type"] === "string" &&
        row["subscription type"].includes(" V2")
      ) {
        return `${id}@2`
      }

      return id
    },
    ({ id, ...row }) => row,
  )
}

function parseTableHead(element: ElementNode) {
  if (element.tagName !== "THEAD" || element.childElementCount !== 1)
    throw new Error("Unable to parse THead.")

  const row = parseTableRow(element.children[0])

  return row
    .map((label = "") =>
      label
        .replace(/\.,'"/g, "")
        .replace(/[^a-z]/gi, " ")
        .replace(/ +/g, " ")
        .trim()
        .toLowerCase(),
    )
    .map((name) =>
      ["id", "name", "field", "label", "param"].includes(name) ? "id" : name,
    )
}

function parseTableBody(element: ElementNode) {
  if (element.tagName !== "TBODY") throw new Error("Unable to parse TBody.")

  const hierarchy: string[] = []
  const rows = element.children
    .map((child) => parseTableRow(child))
    .map(([value = "", ...row]) => {
      const level = value.lastIndexOf("@") + 1
      const id =
        level === 0 ? value : `${hierarchy[level - 1]}.${value.slice(level)}`

      hierarchy[level] = id

      return [id, ...row]
    })

  return rows
}

function parseTableRow(element: ElementNode) {
  if (element.tagName !== "TR") throw new Error("Unable to parse TR.")

  return element.children.map((child, index) => {
    const value = parseTextish(child.childNodes)

    if (index === 0) {
      if (
        child.childNodes.length === 2 &&
        child.childNodes[0].nodeType === NodeType.TEXT_NODE &&
        child.childNodes[1].nodeType === NodeType.ELEMENT_NODE &&
        (child.childNodes[1] as ElementNode).tagName === "CODE"
      ) {
        const level = (child.childNodes[0] as TextNode).text.length / 3

        return `${"@".repeat(level)}${value}`
      }
    }

    return value
  })
}

function parseTextish(element: NodeBase | NodeBase[]): string | undefined {
  if (Array.isArray(element)) {
    const children: Array<string | string[] | ElementNode> = element
      .map((child) => parseTextish(child))
      .filter((value) => typeof value !== "undefined")
      .filter((value) => !!value)

    return children
      .join(" ")
      .split(/\n+/)
      .map((line) => line.trim())
      .join("\n")
      .replaceAll(" ,", ",")
      .replace(/[“”]/g, '"')
      .replace(/For example.+/i, "")
      .replaceAll("’", "'")
      .trim()
  }

  if (isTextNode(element)) return element.text.trim()

  if (!isElementNode(element)) return undefined

  if (element.tagName === "A") {
    const text = parseTextish(element.childNodes)
    if (!text) {
      return undefined
    }

    const href = element.getAttribute("href")

    if (href?.startsWith("#")) {
      return `[${text}](${href})`
    }

    if (href?.startsWith("/")) {
      return `"${text}"`
    }
  }

  if (element.tagName === "SPAN") {
    const className = element.getAttribute("class") ?? ""
    if (className.startsWith("pill ")) {
      return undefined
    }
  }

  if (element.tagName === "UL" || element.tagName === "OL") {
    return `\n\n${element.children
      .map((child) => parseTextish(child.childNodes))
      .filter((line) => !!line)
      .map((line) => `  - ${line}`)
      .join("\n")}\n\n`
  }

  if (element.tagName === "BR") {
    return "\n"
  }

  if (
    ["STRONG", "CODE", "EM", "B", "SPAN", "A", "P"].includes(element.tagName)
  ) {
    return parseTextish(element.childNodes)
  }

  console.warn(
    "Unhandled textish node",
    element.tagName,
    element.parentNode.tagName,
  )
  console.trace()

  return parseTextish(element.childNodes)

  // const children: Array<string | string[] | ElementNode> = element.childNodes
  //   .map((child: ElementNode | TextNode | NodeBase) => {
  //     if (isTextNode(child)) return child.text.trim()

  //     if (!isElementNode(child)) return undefined

  //     if (child.tagName === "A") {
  //       const text = parseTextish(child)
  //       if (!text) {
  //         return undefined
  //       }

  //       const href = child.getAttribute("href")

  //       if (href?.startsWith("#")) {
  //         return `[${text}](${href})`
  //       }

  //       if (href?.startsWith("/")) {
  //         return `"${text}"`
  //       }
  //     }

  //     if (child.tagName === "SPAN") {
  //       const className = child.getAttribute("class") ?? ""
  //       if (className.startsWith("pill ")) {
  //         const text = parseTextish(child)
  //         if (text === "NEW") return undefined
  //         if (text === "BETA") return undefined
  //         if (child.parentNode.tagName === "P") return undefined

  //         return "PILL-DEPRECATED"
  //       }
  //     }

  //     if (child.tagName === "UL" || child.tagName === "OL") {
  //       return `\n\n${child.children
  //         .map((child) => parseTextish(child))
  //         .filter((line) => !!line)
  //         .map((line) => `  - ${line}`)
  //         .join("\n")}\n\n`
  //     }

  //     if (child.tagName === "BR") {
  //       return "\n"
  //     }

  //     if (["STRONG", "CODE", "EM", "B", "SPAN", "A"].includes(child.tagName)) {
  //       return parseTextish(child)
  //     }

  //     console.warn("Unhandled node", child)
  //     return child
  //   })
  //   .filter((value) => typeof value !== "undefined")
  //   .filter((value) => !!value)

  // if (!children.every((child) => typeof child === "string")) {
  //   throw new Error("Unable to parse textish.")
  // }

  // return children
  //   .join(" ")
  //   .split(/\n+/)
  //   .map((line) => line.trim())
  //   .join("\n")
  //   .replaceAll(" ,", ",")
  //   .replace(/[“”]/g, '"')
  //   .replace(/For example.+/i, "")
  //   .replaceAll("’", "'")
  //   .trim()
}

/* Type Guards */

function isElementNode(child: NodeBase): child is ElementNode {
  return child.nodeType === NodeType.ELEMENT_NODE
}

function isTextNode(child: NodeBase): child is TextNode {
  return child.nodeType === NodeType.TEXT_NODE
}
