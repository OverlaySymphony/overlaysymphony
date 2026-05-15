import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

interface Emote {
  /** An ID that identifies this emote. */
  id: string
  /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear. */
  name: string
  /** A generator for the image URLs for the emote. */
  image: (config?: { format?: string; mode?: string; scale?: string }) => string
  /** The subscriber tier at which the emote is unlocked. This field contains the tier information only if emote_type is set to subscriptions, otherwise, it's an empty string. */
  tier: string
  /** The type of emote. Possible values are:\n* bitstier — A custom Bits tier emote.\n* follower — A custom follower emote.\n* subscriptions — A custom subscriber emote. */
  emote_type: string
  /** An ID that identifies the emote set that the emote belongs to. */
  emote_set_id: string
  /** The ID of the broadcaster who owns the emote. */
  owner_id: string
  /** The formats that the emote is available in. Possible values are:\n* animated — An animated GIF is available for this emote.\n* static — A static PNG file is available for this emote. */
  format: string[]
  /** The sizes that the emote is available in.\n* 1.0 — A small version (28px x 28px) is available.\n* 2.0 — A medium version (56px x 56px) is available.\n* 3.0 — A large version (112px x 112px) is available. */
  scale: string[]
  /** The background themes that the emote is available in. Possible values are:\n* dark\n* light */
  theme_mode: string[]
}

interface ChannelEmoteResponse {
  data: Array<Omit<Emote, "image" | "owner_id">>
  template: string
}

export async function getChannelEmotes(
  authentication: Authentication,
): Promise<Emote[]> {
  const { data: emotes, template } = await helix<
    ChannelEmoteResponse,
    {
      broadcaster_id: string
    }
  >(authentication, {
    method: "GET",
    path: "/chat/emotes",
    params: {
      broadcaster_id: authentication.user.id,
    },
  })

  return emotes.map((emote) => ({
    owner_id: authentication.user.id,
    ...emote,
    image: ({ format, mode, scale } = {}) =>
      template
        .replace("{{id}}", emote.id)
        .replace("{{format}}", format ?? emote.format[0])
        .replace("{{theme_mode}}", mode ?? emote.theme_mode[0])
        .replace("{{scale}}", scale ?? emote.scale[emote.scale.length - 1]),
  }))
}

export async function getUserEmotes(
  authentication: Authentication,
): Promise<Emote[]> {
  const { data: emotes, template } = await helix<
    ChannelEmoteResponse,
    {
      user_id: string
    }
  >(authentication, {
    method: "GET",
    path: "/chat/emotes/user",
    params: {
      user_id: authentication.user.id,
    },
  })

  return emotes.map((emote) => ({
    owner_id: authentication.user.id,
    ...emote,
    image: ({ format, mode, scale } = {}) =>
      template
        .replace("{{id}}", emote.id)
        .replace("{{format}}", format ?? emote.format[0])
        .replace("{{theme_mode}}", mode ?? emote.theme_mode[0])
        .replace("{{scale}}", scale ?? emote.scale[emote.scale.length - 1]),
  }))
}
