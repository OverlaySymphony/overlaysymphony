export type Tone = "trigger" | "condition" | "action"

export type Segment = {
  token: boolean
  text: string
}

export function parse(value: string): Segment[] {
  return value
    .split(/(\{[^{}]*\})/g)
    .filter((text) => text !== "")
    .map((text) => ({ token: /^\{[^{}]*\}$/.test(text), text }))
}
