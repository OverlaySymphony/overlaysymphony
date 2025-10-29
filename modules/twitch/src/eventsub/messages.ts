import { type EventConfigs, type EventType } from "./events-helpers.ts"

export type SessionWelcomeMessage = {
  type: "session_welcome"
  metadata: {
    message_id: string
    message_type: "session_welcome"
    message_timestamp: Date
  }
  payload: {
    session: {
      id: string
      status: "connected"
      connected_at: Date
      keepalive_timeout_seconds: number
      reconnect_url: string | null
    }
  }
}

export type SessionKeepaliveMessage = {
  type: "session_keepalive"
  metadata: {
    message_id: string
    message_type: "session_keepalive"
    message_timestamp: Date
  }
  payload: Record<string, never>
}

export type NotificationMessage<Type extends EventType = EventType> = {
  type: "notification"
  metadata: {
    message_id: string
    message_type: "notification"
    message_timestamp: Date
    subscription_type: EventConfigs[Type]["Type"]
    subscription_version: EventConfigs[Type]["Version"]
  }
  payload: EventConfigs[Type]["Payload"]
}

export type TwitchMessage =
  | SessionWelcomeMessage
  | SessionKeepaliveMessage
  | NotificationMessage
