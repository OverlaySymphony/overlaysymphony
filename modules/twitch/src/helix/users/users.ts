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

export async function getUser(
  authentication: Authentication,
  login?: string | string[],
  id?: string | string[],
): Promise<TwitchUser | undefined> {
  if (!login && !id) return undefined

  if (typeof login === "string" && login.startsWith("@")) {
    login = login.slice(1)
  }

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

  const [{ created_at, ...user }] = users

  return {
    ...user,
    created_at: new Date(created_at),
  }
}

export async function getUsers(
  authentication: Authentication,
  login?: string | string[],
  id?: string | string[],
): Promise<TwitchUser[] | undefined> {
  if (!login && !id) return undefined

  if (typeof login === "string" && login.startsWith("@")) {
    login = login.slice(1)
  }

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

export async function getCurrentUser(
  authentication: Authentication,
): Promise<TwitchUser | undefined> {
  const { data: users } = await helix<UsersResponse>(authentication, {
    method: "GET",
    path: "/users",
  })

  const [{ created_at, ...user }] = users

  return {
    ...user,
    created_at: new Date(created_at),
  }
}
