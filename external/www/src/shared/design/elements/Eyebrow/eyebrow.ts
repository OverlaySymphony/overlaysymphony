export type Tone = "accent" | "muted" | "trigger" | "condition" | "action"

export type Size = "large" | "medium" | "small"

export const TONE_COLORS: Record<Tone, string> = {
  accent: "var(--os-color-teal)",
  muted: "var(--os-color-text-muted)",
  trigger: "var(--os-node-trigger)",
  condition: "var(--os-node-condition)",
  action: "var(--os-node-action)",
}
