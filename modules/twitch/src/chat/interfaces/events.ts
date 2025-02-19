export interface ChatEventSource {
  host: string
  user?: string
}

type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>

type TagUserType = "staff" | "global_mod" | "admin" | undefined
type TagBadges = Record<string, number>
type TagBadgeInfo = Record<string, number>
type TagEmotes = Record<
  string,
  Array<[startPosition: string, endPosition: string]>
>

export interface PingEvent {
  type: "PING"
  message: string
  source?: ChatEventSource
}

export interface WelcomeEvent {
  type: "001" // Logged in (successfully authenticated)
  channel: string
  message: string
  source?: ChatEventSource
}

export interface CapabilitiesEvent {
  type: "CAP"
  enabled: boolean
  nickname: string
  capabilities: string[]
  source?: ChatEventSource
}

export interface JoinEvent {
  type: "JOIN"
  channel: string
  source?: ChatEventSource
}

export interface PartEvent {
  type: "PART"
  channel: string
  source?: ChatEventSource
}

export interface GlobalUserStateEvent {
  type: "GLOBALUSERSTATE"
  tags?: {
    userId: string
    userType: TagUserType
    displayName?: string
    color?: string
    badges?: TagBadges
    badgeInfo?: TagBadgeInfo
    emoteSets?: string[]
  }
  source?: ChatEventSource
}

export interface ReconnectEvent {
  type: "RECONNECT"
  source?: ChatEventSource
}

export interface ClearChatEvent {
  type: "CLEARCHAT"
  channel: string
  tags?: {
    roomId: string
    targetUserId: string
    banDuration: number
  }
  source?: ChatEventSource
}

export interface HostTargetEvent {
  type: "HOSTTARGET"
  channel: string
  source?: ChatEventSource
}

export interface NoticeEvent {
  type: "NOTICE"
  channel: string
  tags?: {
    msgId: string
    targetUserId: string
  }
  source?: ChatEventSource
}

export interface RoomStateEvent {
  type: "ROOMSTATE"
  channel: string
  tags?: {
    roomId: string
    slow: number
    emoteOnly: boolean
    followersOnly: boolean
    subsOnly: boolean
  }
  source?: ChatEventSource
}

export interface UserStateEvent {
  type: "USERSTATE"
  channel: string
  tags?: {
    id: string
    userId: string
    userType: TagUserType
    displayName?: string
    color?: string
    badges?: TagBadges
    badgeInfo?: TagBadgeInfo
    emoteSets?: string[]

    mod: boolean
    subscriber: boolean
    vip: boolean
    turbo: boolean
  }
  source?: ChatEventSource
}

export interface ClearMessageEvent {
  type: "CLEARMSG"
  channel: string
  tags?: {
    login: string
    roomId: string
    targetMsgId?: string
  }
  source?: ChatEventSource
}

export interface UserNoticeEvent {
  type: "USERNOTICE"
  channel: string
  tags?: {
    id: string
    userId: string
    userType: TagUserType
    displayName?: string
    login: string
    color?: string
    badges?: TagBadges
    badgeInfo?: TagBadgeInfo
    emotes?: TagEmotes
    roomId: string
    systemMsg: string
    msgId:
      | "sub"
      | "resub"
      | "subgift"
      | "submysterygift"
      | "giftpaidupgrade"
      | "rewardgift"
      | "anongiftpaidupgrade"
      | "raid"
      | "unraid"
      | "ritual"
      | "bitsbadgetier"

    mod: boolean
    subscriber: boolean
    vip: boolean
    turbo: boolean
  }
  source?: ChatEventSource
}

export interface ChatMessageEvent {
  type: "PRIVMSG"
  channel: string
  message: string
  tags?: {
    id: string
    userId: string
    userType: TagUserType
    displayName?: string
    color?: string
    badges?: TagBadges
    badgeInfo?: TagBadgeInfo
    emotes?: TagEmotes
    roomId: string

    firstMsg: boolean
    mod: boolean
    subscriber: boolean
    vip: boolean
    turbo: boolean
  } & AllOrNothing<{
    replyThreadParentMsgId: string
    replyThreadParentUserLogin: string
    replyParentMsgId: string
    replyParentUserId: string
    replyParentUserLogin: string
    replyParentDisplayName: string
    replyParentMsgBody: string
  }> &
    AllOrNothing<{
      pinnedChatPaidIsSystemMessage: boolean
      pinnedChatPaidLevel: string
      pinnedChatPaidAmount: number
      pinnedChatPaidExponent: number
      pinnedChatPaidCurrency: string
    }>
  source?: ChatEventSource
}

export interface WhisperMessageEvent {
  type: "WHISPER"
  channel: string
  message: string
  tags?: {
    messageId: string
    threadId: string
    userId: string
    userType: TagUserType
    displayName?: string
    color?: string
    badges?: TagBadges
    emotes?: TagEmotes
    turbo: boolean
  }
  source?: ChatEventSource
}

export interface ChatCommandEvent {
  type: "PRIVMSG-COMMAND"
  channel: string
  command: string
  parameters?: string
  tags?: ChatMessageEvent["tags"]
  source?: ChatEventSource
}

export interface WhisperCommandEvent {
  type: "WHISPER-COMMAND"
  channel: string
  command: string
  parameters?: string
  tags?: WhisperMessageEvent["tags"]
  source?: ChatEventSource
}

export type ChatEvent =
  | PingEvent
  | WelcomeEvent
  | CapabilitiesEvent
  | JoinEvent
  | PartEvent
  | GlobalUserStateEvent
  | ReconnectEvent
  | ClearChatEvent
  | HostTargetEvent
  | NoticeEvent
  | RoomStateEvent
  | UserStateEvent
  | ClearMessageEvent
  | UserNoticeEvent
  | ChatMessageEvent
  | WhisperMessageEvent
  | ChatCommandEvent
  | WhisperCommandEvent
