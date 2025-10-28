import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function startStreaming(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.startStreaming)
}

export async function stopStreaming(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.stopStreaming)
}
