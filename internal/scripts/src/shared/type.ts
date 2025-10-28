export type FieldType = {
  type: string
  required: boolean
  description?: string
  fields?: Record<string, FieldType>
}

export function makeTypeDefinition(
  fields: FieldType["fields"],
  prefix: string,
): string {
  return Object.entries(fields ?? {})
    .map(([key, { type, required, description, fields }]) => {
      const intro = makeTypeDescription(description, prefix)
      const open = `${prefix}${key}${required ? "" : "?"}`

      if (type === "object" && fields) {
        return [
          intro,
          `${open}: {`,
          makeTypeDefinition(fields, `${prefix}  `),
          `${prefix}}`,
        ]
          .filter((line) => typeof line !== "undefined")
          .join("\n")
      }

      if (type === "object[]" && fields) {
        return [
          intro,
          `${open}: Array<{`,
          makeTypeDefinition(fields, `${prefix}  `),
          `${prefix}}>`,
        ]
          .filter((line) => typeof line !== "undefined")
          .join("\n")
      }

      return [intro, `${open}: ${type}`]
        .filter((line) => typeof line !== "undefined")
        .join("\n")
    })
    .join("\n")
}

function makeTypeDescription(description: string | undefined, prefix: string) {
  if (!description) return undefined

  const lines = description.split("\n")
  if (lines.length === 1) {
    return `${prefix}/** ${description} */`
  }

  return ["/**", ...lines.map((line) => ` *${line ? ` ${line}` : ""}`), " */"]
    .map((line) => `${prefix}${line}`)
    .join("\n")
}
