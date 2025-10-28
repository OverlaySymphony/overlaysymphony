import {
  ControlLevel,
  ensureControlLevel,
  promisify,
} from "../actions-helpers.ts"

export async function getStatus(): Promise<{
  recording: boolean | null
  streaming: boolean
  replaybuffer: boolean
  virtualcam: boolean
}> {
  await ensureControlLevel(ControlLevel.READ_USER)

  const { recording, recordingPaused, streaming, replaybuffer, virtualcam } =
    await promisify(window.obsstudio.getStatus)

  return {
    recording: recordingPaused ? null : recording,
    streaming,
    replaybuffer,
    virtualcam,
  }
}
