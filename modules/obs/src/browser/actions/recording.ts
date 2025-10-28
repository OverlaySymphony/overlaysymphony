import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function startRecording(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.startRecording)
}

export async function stopRecording(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.stopRecording)
}

export async function pauseRecording(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.pauseRecording)
}

export async function unpauseRecording(): Promise<void> {
  await ensureControlLevel(ControlLevel.ALL)

  await promisify(window.obsstudio.unpauseRecording)
}
