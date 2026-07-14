export type Tone = "accent" | "muted" | "trigger" | "condition" | "action"

export type Size = "large" | "medium" | "small"

export const TONE_COLORS: Record<Tone, string> = {
  accent: "var(--os-color-teal)",
  muted: "var(--os-color-text-muted)",
  trigger: "var(--os-color-trigger)",
  condition: "var(--os-color-condition)",
  action: "var(--os-color-action)",
}
