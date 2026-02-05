import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

interface ChatMessageResponse {
  data: Array<{
    message_id: string /** The message id for the message that was sent. */
    is_sent: boolean /** If the message passed all checks and was sent. */
  }>
  /** The reason the message was dropped, if any. */
  drop_reason?: {
    code: string /** Code for why the message was dropped. */
    message: string /** Message for why the message was dropped. */
  }
}

interface ChatMessage {
  message_id: string /** The message id for the message that was sent. */
  is_sent: boolean /** If the message passed all checks and was sent. */
  /** The reason the message was dropped, if any. */
  drop_reason?: {
    code: string /** Code for why the message was dropped. */
    message: string /** Message for why the message was dropped. */
  }
}

export async function sendChatAnnouncement(
  authentication: Authentication,
  message: string,
  color?: string,
): Promise<void> {
  await helix<
    never,
    {
      moderator_id: string
      broadcaster_id: string
    },
    {
      message: string
      color?: string
    }
  >(authentication, {
    method: "GET",
    path: "/chat/announcements",
    params: {
      moderator_id: authentication.user.id,
      broadcaster_id: authentication.user.id,
    },
    body: {
      message,
      color,
    },
  })
}

export async function sendChatShoutout(
  authentication: Authentication,
  to_broadcaster_id: string,
): Promise<void> {
  await helix<
    never,
    {
      moderator_id: string
      from_broadcaster_id: string
      to_broadcaster_id: string
    }
  >(authentication, {
    method: "GET",
    path: "/chat/shoutouts",
    params: {
      moderator_id: authentication.user.id,
      from_broadcaster_id: authentication.user.id,
      to_broadcaster_id,
    },
  })
}

export async function sendChatMessage(
  authentication: Authentication,
  message: string,
  broadcaster_id: string = authentication.user.id,
  reply_parent_message_id?: string,
): Promise<ChatMessage> {
  const {
    data: [data],
    drop_reason,
  } = await helix<
    ChatMessageResponse,
    {
      sender_id: string
      broadcaster_id: string
      message: string
      reply_parent_message_id?: string
    }
  >(authentication, {
    method: "GET",
    path: "/chat/message",
    params: {
      sender_id: authentication.user.id,
      broadcaster_id,
      message,
      reply_parent_message_id,
    },
  })

  return {
    ...data,
    drop_reason,
  }
}
