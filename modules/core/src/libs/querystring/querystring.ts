type Value = string | number | boolean | null | undefined
type ParsedQuerystring = Record<string, Value | Value[]>

export function stringify(input: ParsedQuerystring): string {
  const output: string[] = []

  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      const values = value
      for (const value of values) {
        if (typeof value !== "undefined" && value !== null) {
          output.push(`${key}=${encodeURIComponent(value)}`)
        }
      }
    } else {
      if (typeof value !== "undefined" && value !== null) {
        output.push(`${key}=${encodeURIComponent(value)}`)
      }
    }
  }

  return output.join("&")
}

export function parse(input: string): ParsedQuerystring {
  input = decodeURIComponent(input)
  if (input.startsWith("#")) input = input.slice(1)
  if (input.startsWith("?")) input = input.slice(1)

  if (input.length === 0) {
    return {}
  }

  const output: ParsedQuerystring = {}

  for (const pair of input.split("&")) {
    const [key, value] = pair.split("=")
    output[key] = value
  }

  return output
}

export default { stringify, parse }
