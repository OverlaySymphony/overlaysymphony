interface ApplicableChatEvent {
  tags?: {
    mod?: boolean
    badges?: {
      broadcaster?: boolean
    }
  }
}

export function isBroadcaster(event: ApplicableChatEvent): boolean | null {
  const broadcaster = event.tags?.badges?.broadcaster

  if (typeof broadcaster === "undefined") return null

  return broadcaster
}

export function isMod(event: ApplicableChatEvent): boolean | null {
  const broadcaster = event.tags?.badges?.broadcaster
  const mod = event.tags?.mod

  if (typeof broadcaster === "undefined" || typeof mod === "undefined")
    return null

  return broadcaster || mod
}

export function isModOnly(event: ApplicableChatEvent): boolean | null {
  const broadcaster = event.tags?.badges?.broadcaster
  const mod = event.tags?.mod

  if (typeof broadcaster === "undefined" || typeof mod === "undefined")
    return null

  return mod && !broadcaster
}
