import { type Connection } from "../index.ts"

export interface HelixChatMessage {
  message_id: string /** The message id for the message that was sent. */
  is_sent: boolean /** If the message passed all checks and was sent. */
  /** The reason the message was dropped, if any. */
  drop_reason?: {
    code: string /** Code for why the message was dropped. */
    message: string /** Message for why the message was dropped. */
  }
}

export type HelixChatAnnouncement = undefined
// export interface HelixChatAnnouncement {}

export type HelixChatShoutout = undefined
// export interface HelixChatShoutout {}

interface ChatMessageResponse {
  data: HelixChatMessage[]
}

export async function sendChatAnnouncement(
  connection: Connection,
  moderator_id: string,
  broadcaster_id: string,
  message: string,
  color?: string,
): Promise<HelixChatAnnouncement> {
  await connection.helix<
    never,
    {
      moderator_id: string
      broadcaster_id: string
    },
    {
      message: string
      color?: string
    }
  >({
    method: "POST",
    path: "/chat/announcements",
    params: {
      moderator_id,
      broadcaster_id,
    },
    body: {
      message,
      color,
    },
  })
}

export async function sendChatShoutout(
  connection: Connection,
  moderator_id: string,
  from_broadcaster_id: string,
  to_broadcaster_id: string,
): Promise<HelixChatShoutout> {
  await connection.helix<
    never,
    {
      moderator_id: string
      from_broadcaster_id: string
      to_broadcaster_id: string
    }
  >({
    method: "POST",
    path: "/chat/shoutouts",
    params: {
      moderator_id,
      from_broadcaster_id,
      to_broadcaster_id,
    },
  })
}

export async function sendChatMessage(
  connection: Connection,
  sender_id: string,
  broadcaster_id: string,
  message: string,
  reply_parent_message_id?: string,
): Promise<HelixChatMessage> {
  const {
    data: [data],
  } = await connection.helix<
    ChatMessageResponse,
    {
      sender_id: string
      broadcaster_id: string
      message: string
      reply_parent_message_id?: string
    }
  >({
    method: "POST",
    path: "/chat/messages",
    params: {
      sender_id,
      broadcaster_id,
      message,
      reply_parent_message_id,
    },
  })

  if (!data.is_sent) {
    throw new Error(
      `${data.drop_reason?.code ?? "error"}: ${data.drop_reason?.message ?? "Unknown."}`,
    )
  }

  return data
}
