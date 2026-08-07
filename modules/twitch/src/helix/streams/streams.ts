import { type Connection } from "../index.ts"

export interface HelixStream {
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
  data: HelixStream[]
}

export async function getStream(
  connection: Connection,
  user_login?: string | string[],
  user_id?: string | string[],
): Promise<HelixStream | undefined> {
  if (!user_login && !user_id) return undefined

  if (typeof user_login === "string" && user_login.startsWith("@")) {
    user_login = user_login.slice(1)
  }

  const { data: streams } = await connection.helix<
    StreamsResponse,
    { user_id?: string | string[]; user_login?: string | string[] }
  >({
    method: "GET",
    path: "/users",
    params: {
      user_id,
      user_login,
    },
  })

  return streams[0]
}
