import { type Connection } from "../index.ts"

export interface HelixChannel {
  broadcaster_id: string /** An ID that uniquely identifies the broadcaster. */
  broadcaster_login: string /** The broadcaster’s login name. */
  broadcaster_name: string /** The broadcaster’s display name. */
  broadcaster_language: string /** The broadcaster’s preferred language. */
  game_name?: string /** The name of the game that the broadcaster is playing or last played. */
  game_id?: string /** An ID that uniquely identifies the game that the broadcaster is playing or last played. */
  title?: string /** The title of the stream that the broadcaster is currently streaming or last streamed. */
  tags?: string[] /** The tags applied to the channel. */
  content_classification_labels: string[] /** The content classification labels applied to the channel. */
  is_branded_content: boolean /** A flag indicating if the channel has branded content. */
}

interface ChannelsResponse {
  data: HelixChannel[]
}

export async function getChannel(
  connection: Connection,
  broadcaster_id: string,
): Promise<HelixChannel | undefined> {
  const {
    data: [channel],
  } = await connection.helix<ChannelsResponse, { broadcaster_id: string }>({
    method: "GET",
    path: "/channels",
    params: {
      broadcaster_id,
    },
  })

  return channel
}
