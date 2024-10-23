/// <reference types="obs-studio" />

enum ControlLevel {
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
    return -1
  }

  const level = await toPromise(window.obsstudio.getControlLevel)
  return level
}

export async function verifyControlLevel(
  target: ControlLevel,
): Promise<boolean> {
  const level = await getControlLevel()

  if (level === ControlLevel.MISSING) {
    console.error("OBS context not available.")
  } else if (level < target) {
    console.error(
      `Please elevate browser source "page permissions" to ${ControlLevel[target]} or higher.`,
    )
  }

  return level >= target
}

export async function ensureControlLevel(target: ControlLevel): Promise<void> {
  const level = await getControlLevel()

  if (level === ControlLevel.MISSING) {
    throw new Error("OBS context not available.")
  } else if (level < target) {
    throw new Error(
      `Please elevate browser source "page permissions" to ${ControlLevel[target]} or higher.`,
    )
  }
}

export async function getStreaming(): Promise<boolean> {
  await ensureControlLevel(ControlLevel.READ_OBS)

  const status = await toPromise(window.obsstudio.getStatus)
  return status.streaming
}

export async function onStreaming(
  callback: (status: boolean) => void,
): Promise<void> {
  if (!(await verifyControlLevel(ControlLevel.READ_OBS))) return

  const streaming = await getStreaming()

  // window.addEventListener("obsStreamingStarting", () => callback(true))
  window.addEventListener("obsStreamingStarted", () => callback(true))
  // window.addEventListener("obsStreamingStopping", () => callback(false))
  window.addEventListener("obsStreamingStopped", () => callback(false))

  callback(streaming)
}

export async function getScenes(): Promise<string[]> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const scenes = await toPromise(window.obsstudio.getScenes)
  return scenes
}

export async function onScenes(
  callback: (status: string[]) => void,
): Promise<void> {
  if (!(await verifyControlLevel(ControlLevel.READ_USER))) return

  const scenes = await getScenes()

  window.addEventListener("obsSceneListChanged", (event) => {
    callback(event.detail)
  })

  callback(scenes)
}

export async function getScene(): Promise<string> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const scene = await toPromise(window.obsstudio.getCurrentScene)
  return scene.name
}

export async function onScene(
  callback: (scene: string) => void,
): Promise<void> {
  if (!(await verifyControlLevel(ControlLevel.READ_USER))) return

  const scene = await getScene()

  window.addEventListener("obsSceneChanged", (event) => {
    callback(event.detail.name)
  })

  callback(scene)
}

export async function onVisible(
  callback: (visible: boolean) => void,
): Promise<void> {
  if (!(await verifyControlLevel(ControlLevel.NONE))) return

  window.addEventListener("obsSourceVisibleChanged", (event) => {
    callback(event.detail.visible)
  })
}

function toPromise<T>(fn: (resolve: (value: T) => void) => void): Promise<T> {
  return new Promise((resolve) => fn(resolve))
}
