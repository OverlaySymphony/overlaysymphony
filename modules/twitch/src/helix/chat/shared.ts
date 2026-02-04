import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

interface ChannelEmote {
  id: string /** An ID that identifies this emote. */
  name: string /** The name of the emote. This is the name that viewers type in the chat window to get the emote to appear. */
  image: () => string /** A generator for the image URLs for the emote. */
  tier: string /** The subscriber tier at which the emote is unlocked. This field contains the tier information only if emote_type is set to subscriptions, otherwise, it's an empty string. */
  emote_type: string /** The type of emote. Possible values are:\n* bitstier — A custom Bits tier emote.\n* follower — A custom follower emote.\n* subscriptions — A custom subscriber emote. */
  emote_set_id: string /** An ID that identifies the emote set that the emote belongs to. */
  format: string[] /** The formats that the emote is available in. Possible values are:\n* animated — An animated GIF is available for this emote.\n* static — A static PNG file is available for this emote. */
  scale: string[] /** The sizes that the emote is available in.\n* 1.0 — A small version (28px x 28px) is available.\n* 2.0 — A medium version (56px x 56px) is available.\n* 3.0 — A large version (112px x 112px) is available. */
  theme_mode: string[] /** The background themes that the emote is available in. Possible values are:\n* dark\n* light */
}

interface SharedChatSessionResponse {
  data: Array<
    Omit<ChannelEmote, "image"> & {
      images: {
        url_1x: string
        url_2x: string
        url_4x: string
      }
    }
  >
  template: string
}

export async function getSharedChatSession(
  authentication: Authentication,
): Promise<ChannelEmote[]> {
  const { data: emotes, template } = await helix<
    SharedChatSessionResponse,
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

  return emotes.map(({ images, ...emote }) => ({
    ...emote,
    image: () => template,
  }))
}
