export default function trimMultilineString(
  input: string,
  endOfFile = false,
): string {
  const allLines = input.split("\n")
  const start = allLines.findIndex((line) => !!line.trim())
  const end = allLines.findLastIndex((line) => !!line.trim()) + 1
  const lines = allLines.slice(start, end)

  if (lines.length === 0) return ""

  const prefix = lines.reduce((current, line) => {
    if (line.length === 0) return current

    const spaces = line.slice(0, line.length - line.trimStart().length)

    for (let length = current.length; length >= 0; length--) {
      const next = current.slice(0, length)
      if (spaces.startsWith(next)) {
        return next
      }
    }

    return ""
  })

  return `${lines.map((line) => line.slice(prefix.length, line.length)).join("\n")}${endOfFile ? "\n" : ""}`
}
