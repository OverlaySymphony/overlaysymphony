interface ApplicableChatEvent {
  badges: Array<{
    set_id: string
    id: string
    info: string
  }>
}

export function isBroadcaster(event: ApplicableChatEvent): boolean {
  const broadcaster = !!event.badges.find((badge) => {
    return badge.set_id === "broadcaster"
  })

  return broadcaster
}

export function isModerator(event: ApplicableChatEvent): boolean {
  const broadcaster = !!event.badges.find((badge) => {
    return badge.set_id === "broadcaster"
  })
  const moderator = !!event.badges.find((badge) => {
    return badge.set_id === "moderator"
  })

  return broadcaster || moderator
}

export function isModeratorOnly(event: ApplicableChatEvent): boolean {
  const broadcaster = !!event.badges.find((badge) => {
    return badge.set_id === "broadcaster"
  })
  const moderator = !!event.badges.find((badge) => {
    return badge.set_id === "moderator"
  })

  return !broadcaster && moderator
}

export function isSubscriber(event: ApplicableChatEvent): false | number {
  const subscriber = event.badges.find((badge) => {
    return badge.set_id === "subscriber"
  })

  return +(subscriber?.info ?? "0") || false
}
