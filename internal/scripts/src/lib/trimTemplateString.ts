export default function trimTemplateString(
  input: string,
  endOfFile = false,
): string {
  const lines = input.split("\n")
  if (lines[0].trim() === "") lines.splice(0, 1)
  if (lines[lines.length - 1].trim() === "") lines.splice(-1, 1)

  let prefix: string = "#FAKE#"
  for (const line of lines) {
    const linePrefix = line.replace(/[\S].*/, "")

    if (prefix === "#FAKE#") {
      prefix = linePrefix
      continue
    }

    if (linePrefix === "" || linePrefix.startsWith(prefix)) {
      continue
    }

    let length
    for (length = 0; length < linePrefix.length; length++) {
      if (linePrefix[length] !== line[length]) {
        length++
        break
      }
    }

    prefix = linePrefix.slice(0, length)
  }

  return (
    lines.map((line) => line.replace(prefix, "")).join("\n") +
    (endOfFile ? "\n" : "")
  )
}
