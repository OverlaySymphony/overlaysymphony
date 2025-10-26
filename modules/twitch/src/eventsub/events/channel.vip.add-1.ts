import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.vip.add": ChannelVipAdd
  }
}

/** Channel Vip Add v1: When a VIP is added to the channel. */
type ChannelVipAdd = EventConfig<{
  Type: "channel.vip.add"
  Version: "1"
  /** The conditions to listen for when a VIP is added to the channel. */
  Condition: {
    /** The User ID of the broadcaster (channel) Maximum: 1 */
    broadcaster_user_id: string
  }
  /** The event fired when a VIP is added to the channel. */
  Event: {
    /** The ID of the user who was added as a VIP. */
    user_id: string
    /** The login of the user who was added as a VIP. */
    user_login: string
    /** The display name of the user who was added as a VIP. */
    user_name: string
    /** The ID of the broadcaster. */
    broadcaster_user_id: string
    /** The login of the broadcaster. */
    broadcaster_user_login: string
    /** The display name of the broadcaster. */
    broadcaster_user_name: string
  }
}>

registerEvent("channel.vip.add", {
  scopes: ["channel:manage:vips", "channel:read:vips"],
  subscriber: (userId) => ({
    type: "channel.vip.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
