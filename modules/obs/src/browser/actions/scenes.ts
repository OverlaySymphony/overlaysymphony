import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function getScenes(): Promise<string[]> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const scenes = await promisify(window.obsstudio.getScenes)
  return scenes
}

export async function getScene(): Promise<string> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const scene = await promisify(window.obsstudio.getCurrentScene)
  return scene.name
}

export async function setScene(scene: string): Promise<void> {
  await ensureControlLevel(ControlLevel.ADVANCED)

  await promisify(() => window.obsstudio.setCurrentScene(scene))
}
