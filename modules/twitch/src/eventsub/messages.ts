import { type TwitchNotificationMessage } from "./events/index.js"

export interface SessionWelcomeMessage {
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

export interface SessionKeepaliveMessage {
  type: "session_keepalive"
  metadata: {
    message_id: string
    message_type: "session_keepalive"
    message_timestamp: Date
  }
  payload: Record<string, never>
}

export type TwitchMessage =
  | SessionWelcomeMessage
  | SessionKeepaliveMessage
  | TwitchNotificationMessage
