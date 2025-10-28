import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function startVirtualcam(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.startVirtualcam)
}

export async function stopVirtualcam(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.stopVirtualcam)
}
