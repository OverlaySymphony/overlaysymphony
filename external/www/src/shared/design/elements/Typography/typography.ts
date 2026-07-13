export type Role = "title" | "body" | "label" | "code"

export type Size = "large" | "medium" | "small"

export const ROLES: Role[] = ["title", "body", "label", "code"]

export const SIZES: Size[] = ["large", "medium", "small"]

export type TypographyProperty =
  | "size"
  | "weight"
  | "tracking"
  | "leading"
  | "font"

export function getToken(
  role: Role,
  size: Size,
  property: TypographyProperty,
): string {
  if (property === "font") {
    return role === "label" || role === "code"
      ? "--os-font-code"
      : "--os-font-body"
  }

  return `--os-${role}-${size}-${property}`
}
