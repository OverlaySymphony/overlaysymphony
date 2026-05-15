import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

export interface TwitchStream {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  tags: string[]
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
}

interface StreamsResponse {
  data: TwitchStream[]
}

export async function getStream(
  authentication: Authentication,
  login?: string | string[],
  id?: string | string[],
): Promise<TwitchStream | undefined> {
  if (!login && !id) return undefined

  if (typeof login === "string" && login.startsWith("@")) {
    login = login.slice(1)
  }

  const { data: streams } = await helix<
    StreamsResponse,
    { user_id?: string | string[]; user_login?: string | string[] }
  >(authentication, {
    method: "GET",
    path: "/users",
    params: {
      user_id: id,
      user_login: login,
    },
  })

  return streams[0]
}
