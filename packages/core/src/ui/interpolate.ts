const localStoragePrefix = "overlaysymphony:variables"

export default function interpolate(input: string): string {
  return input.replace(
    /\{([a-z0-9-]+?)\}/,
    (match, key) => getValue(key) ?? match,
  )
}

export function getValue(key: string): string | undefined {
  const localStorageKey = `${localStoragePrefix}:${key}`

  const value = localStorage.getItem(localStorageKey) || undefined

  return value
}

export function setValue(key: string, value: string | undefined): void {
  const localStorageKey = `${localStoragePrefix}:${key}`

  if (typeof value === "undefined") {
    localStorage.removeItem(localStorageKey)
  } else {
    localStorage.setItem(localStorageKey, value)
  }
}
