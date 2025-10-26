import { type Authentication } from "../../authentication/index.js"
import { helix } from "../helix.js"

export interface TwitchUser {
  id: string
  login: string
  display_name: string
  type: "admin" | "global_mod" | "staff" | ""
  broadcaster_type: "partner" | "affiliate" | ""
  description: string
  profile_image_url: string
  offline_image_url: string
  created_at: Date
}

type RawUser = Omit<TwitchUser, "created_at"> & {
  created_at: string
}

export async function getUsers(
  authentication: Authentication,
  id?: string | string[],
  login?: string | string[],
): Promise<TwitchUser[]> {
  const data = await helix<TwitchUser, RawUser>(
    authentication,
    {
      method: "GET",
      path: "/users",
      params: {
        id,
        login,
      },
    },
    ({ created_at, ...data }) => ({
      ...data,
      created_at: new Date(created_at),
    }),
  )

  return data
}
