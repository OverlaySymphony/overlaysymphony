import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.update": ChannelUpdate
  }
}

/** Channel Update v2: When the broadcaster updates their channel properties e.g., category, title, content classification labels, broadcast, or language. */
type ChannelUpdate = EventConfig<{
  Type: "channel.update"
  Version: "2"
  /** The conditions to listen for when the broadcaster updates their channel properties e.g., category, title, content classification labels, broadcast, or language. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get updates for. */
    broadcaster_user_id: string
  }
  /** The event fired when the broadcaster updates their channel properties e.g., category, title, content classification labels, broadcast, or language. */
  Event: {
    /** The broadcaster's user ID. */
    broadcaster_user_id: string
    /** The broadcaster's user login. */
    broadcaster_user_login: string
    /** The broadcaster's user display name. */
    broadcaster_user_name: string
    /** The channel's stream title. */
    title: string
    /** The channel's broadcast language. */
    language: string
    /** The channel's category ID. */
    category_id: string
    /** The category name. */
    category_name: string
    /** Array of content classification label IDs currently applied on the Channel. To retrieve a list of all possible IDs, use the "Get Content Classification Labels" API endpoint. */
    content_classification_labels: string[]
  }
}>

registerEvent("channel.update", {
  scopes: [],
  subscriber: (userId) => ({
    type: "channel.update",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
