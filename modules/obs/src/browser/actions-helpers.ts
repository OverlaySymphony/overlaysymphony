export enum ControlLevel {
  "MISSING" = -1,
  "NONE" = 0,
  "READ_OBS" = 1,
  "READ_USER" = 2,
  "BASIC" = 3,
  "ADVANCED" = 4,
  "ALL" = 5,
}

export async function getControlLevel(): Promise<ControlLevel> {
  if (!window.obsstudio) {
    return ControlLevel.MISSING
  }

  const level = await promisify(window.obsstudio.getControlLevel)
  return level
}

export async function verifyControlLevel(
  target: ControlLevel,
): Promise<boolean> {
  const level = await getControlLevel()

  if (level < target) {
    console.error(
      `Please elevate browser source "page permissions" to ${ControlLevel[target]} or higher.`,
    )

    return false
  }

  return true
}

export async function ensureControlLevel(
  target: ControlLevel,
): Promise<boolean> {
  const level = await getControlLevel()

  if (level === ControlLevel.MISSING) {
    throw new Error("OBS context not available.")
  }

  if (level < target) {
    throw new Error(
      `Browser source "page permissions" must be ${ControlLevel[target]} or higher.`,
    )
  }

  return true
}

export function promisify<T>(
  fn: (resolve: (value: T) => void) => void,
): Promise<T> {
  return new Promise((resolve) => fn(resolve))
}
