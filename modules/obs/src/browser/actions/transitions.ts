import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function getTransitions(): Promise<string[]> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const transitions = await promisify(window.obsstudio.getTransitions)
  return transitions
}

export async function getTransition(): Promise<string> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const transition = await promisify(window.obsstudio.getCurrentTransition)
  return transition
}

export async function setTransition(transition: string): Promise<void> {
  await ensureControlLevel(ControlLevel.ADVANCED)

  await promisify(() => window.obsstudio.setCurrentTransition(transition))
}
