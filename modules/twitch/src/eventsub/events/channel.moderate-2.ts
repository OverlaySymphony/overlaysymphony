import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.moderate": ChannelModerate
  }
}

/** Channel Moderate v2: When a moderator performs a moderation action in a channel. Includes warnings. */
type ChannelModerate = EventConfig<{
  Type: "channel.moderate"
  Version: "2"
  /** The conditions to listen for when a moderator performs a moderation action in a channel. Includes warnings. */
  Condition: {
    /** The user ID of the broadcaster. */
    broadcaster_user_id: string
    /** The user ID of the moderator. */
    moderator_user_id: string
  }
  /** The event fired when a moderator performs a moderation action in a channel. Includes warnings. */
  Event: {
    /** The ID of the broadcaster. */
    broadcaster_user_id: string
    /** The login of the broadcaster. */
    broadcaster_user_login: string
    /** The user name of the broadcaster. */
    broadcaster_user_name: string
    /** The channel in which the action originally occurred. Is the same as the broadcaster_user_id if not in shared chat. */
    source_broadcaster_user_id: string
    /** The channel in which the action originally occurred. Is the same as the broadcaster_user_login if not in shared chat. */
    source_broadcaster_user_login: string
    /** The channel in which the action originally occurred. Is null when the moderator action happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_name: string
    /** The ID of the moderator who performed the action. */
    moderator_user_id: string
    /** The login of the moderator. */
    moderator_user_login: string
    /** The user name of the moderator. */
    moderator_user_name: string
    /**
     * The type of action: Possible values are:
     * - ban
     * - timeout
     * - unban
     * - untimeout
     * - clear
     * - emoteonly
     * - emoteonlyoff
     * - followers
     * - followersoff
     * - uniquechat
     * - uniquechatoff
     * - slow
     * - slowoff
     * - subscribers
     * - subscribersoff
     * - unraid
     * - delete
     * - unvip
     * - vip
     * - raid
     * - add_blocked_term
     * - add_permitted_term
     * - remove_blocked_term
     * - remove_permitted_term
     * - mod
     * - unmod
     * - approve_unban_request
     * - deny_unban_request
     * - shared_chat_ban
     * - shared_chat_timeout
     * - shared_chat_untimeout
     * - shared_chat_unban
     * - shared_chat_delete
     */
    action: string
    /** Optional.. Metadata associated with the followers command. */
    followers?: {
      /** The length of time, in minutes, that the followers must have followed the broadcaster to participate in the chat room. */
      follow_duration_minutes: number
    }
    /** Metadata associated with the slow command. */
    slow?: {
      /** The amount of time, in seconds, that users need to wait between sending messages. */
      wait_time_seconds: number
    }
    /** Metadata associated with the vip command. */
    vip?: {
      /** The ID of the user gaining VIP status. */
      user_id: string
      /** The login of the user gaining VIP status. */
      user_login: string
      /** The user name of the user gaining VIP status. */
      user_name: string
    }
    /** Metadata associated with the unvip command. */
    unvip?: {
      /** The ID of the user losing VIP status. */
      user_id: string
      /** The login of the user losing VIP status. */
      user_login: string
      /** The user name of the user losing VIP status. */
      user_name: string
    }
    /** Metadata associated with the mod command. */
    mod?: {
      /** The ID of the user gaining mod status. */
      user_id: string
      /** The login of the user gaining mod status. */
      user_login: string
      /** The user name of the user gaining mod status. */
      user_name: string
    }
    /** Metadata associated with the unmod command. */
    unmod?: {
      /** The ID of the user losing mod status. */
      user_id: string
      /** The login of the user losing mod status. */
      user_login: string
      /** The user name of the user losing mod status. */
      user_name: string
    }
    /** Metadata associated with the ban command. */
    ban?: {
      /** The ID of the user being banned. */
      user_id: string
      /** The login of the user being banned. */
      user_login: string
      /** The user name of the user being banned. */
      user_name: string
      /** Reason given for the ban. */
      reason?: string
    }
    /** Metadata associated with the unban command. */
    unban?: {
      /** The ID of the user being unbanned. */
      user_id: string
      /** The login of the user being unbanned. */
      user_login: string
      /** The user name of the user being unbanned. */
      user_name: string
    }
    /** Optional.. Metadata associated with the timeout command. */
    timeout?: {
      /** The ID of the user being timed out. */
      user_id: string
      /** The login of the user being timed out. */
      user_login: string
      /** The user name of the user being timed out. */
      user_name: string
      /** Optional.. The reason given for the timeout. */
      reason?: string
      /** The time at which the timeout ends. */
      expires_at: string
    }
    /** Metadata associated with the untimeout command. */
    untimeout?: {
      /** The ID of the user being untimed out. */
      user_id: string
      /** The login of the user being untimed out. */
      user_login: string
      /** The user name of the user untimed out. */
      user_name: string
    }
    /** Optional.. Metadata associated with the raid command. */
    raid?: {
      /** The ID of the user being raided. */
      user_id: string
      /** The login of the user being raided. */
      user_login: string
      /** The user name of the user raided. */
      user_name: string
      /** The viewer count. */
      viewer_count: number
    }
    /** Metadata associated with the unraid command. */
    unraid?: {
      /** The ID of the user no longer being raided. */
      user_id: string
      /** The login of the user no longer being raided. */
      user_login: string
      /** The user name of the no longer user raided. */
      user_name: string
    }
    /** Metadata associated with the delete command. */
    delete?: {
      /** The ID of the user whose message is being deleted. */
      user_id: string
      /** The login of the user. */
      user_login: string
      /** The user name of the user. */
      user_name: string
      /** The ID of the message being deleted. */
      message_id: string
      /** The message body of the message being deleted. */
      message_body: string
    }
    /** Metadata associated with the automod terms changes. */
    automod_terms?: {
      /** Either "add" or "remove". */
      action: string
      /** Either "blocked" or "permitted". */
      list: string
      /** Terms being added or removed. */
      terms: string[]
      /** Whether the terms were added due to an Automod message approve/deny action. */
      from_automod: boolean
    }
    /** Metadata associated with an unban request. */
    unban_request?: {
      /** Whether or not the unban request was approved or denied. */
      is_approved: boolean
      /** The ID of the banned user. */
      user_id: string
      /** The login of the user. */
      user_login: string
      /** The user name of the user. */
      user_name: string
      /** The message included by the moderator explaining their approval or denial. */
      moderator_message: string
    }
    /** Information about the shared_chat_ban event. Is null if action is not shared_chat_ban . This field has the same information as the ban field but for a action that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_ban?: object
    /** Information about the shared_chat_unban event. Is null if action is not shared_chat_unban . This field has the same information as the unban field but for a action that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_unban?: object
    /** Information about the shared_chat_timeout event. Is null if action is not shared_chat_timeout . This field has the same information as the timeout field but for a action that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_timeout?: object
    /** Information about the shared_chat_untimeout event. Is null if action is not shared_chat_untimeout . This field has the same information as the untimeout field but for a action that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_untimeout?: object
    /** Information about the shared_chat_delete event. Is null if action is not shared_chat_delete . This field has the same information as the delete field but for a action that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_delete?: object
  }
}>

registerEvent("channel.moderate", {
  scopes: [
    "moderator:manage:banned",
    "moderator:manage:blocked",
    "moderator:manage:chat",
    "moderator:manage:unban",
    "moderator:manage:warnings",
    "moderator:read:banned",
    "moderator:read:blocked",
    "moderator:read:chat",
    "moderator:read:moderators",
    "moderator:read:unban",
    "moderator:read:vips",
    "moderator:read:warnings",
  ],
  subscriber: (userId) => ({
    type: "channel.moderate",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
