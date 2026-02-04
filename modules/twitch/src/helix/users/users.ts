import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

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

interface UsersResponse {
  data: Array<
    Omit<TwitchUser, "created_at"> & {
      created_at: string
    }
  >
}

export async function getUsers(
  authentication: Authentication,
  id?: string | string[],
  login?: string | string[],
): Promise<TwitchUser[]> {
  const { data: users } = await helix<
    UsersResponse,
    { id?: string | string[]; login?: string | string[] }
  >(authentication, {
    method: "GET",
    path: "/users",
    params: {
      id,
      login,
    },
  })

  return users.map(({ created_at, ...user }) => ({
    ...user,
    created_at: new Date(created_at),
  }))
}
