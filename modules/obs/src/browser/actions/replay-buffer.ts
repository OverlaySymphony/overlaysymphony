import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function startReplayBuffer(): Promise<void> {
  await ensureControlLevel(ControlLevel.ADVANCED)

  await promisify(window.obsstudio.startReplayBuffer)
}

export async function stopReplayBuffer(): Promise<void> {
  await ensureControlLevel(ControlLevel.ADVANCED)

  await promisify(window.obsstudio.stopReplayBuffer)
}

export async function saveReplayBuffer(): Promise<void> {
  await ensureControlLevel(ControlLevel.BASIC)

  await promisify(window.obsstudio.saveReplayBuffer)
}
