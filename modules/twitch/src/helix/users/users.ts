import { type Connection } from "../index.ts"

export interface HelixUser {
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
    Omit<HelixUser, "created_at"> & {
      created_at: string
    }
  >
}

export async function getUser(
  connection: Connection,
  login?: string | string[],
  id?: string | string[],
): Promise<HelixUser | undefined> {
  if (!login && !id) return undefined

  if (typeof login === "string" && login.startsWith("@")) {
    login = login.slice(1)
  }

  const { data: users } = await connection.helix<
    UsersResponse,
    { id?: string | string[]; login?: string | string[] }
  >({
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
  connection: Connection,
  login?: string | string[],
  id?: string | string[],
): Promise<HelixUser[] | undefined> {
  if (!login && !id) return undefined

  if (typeof login === "string" && login.startsWith("@")) {
    login = login.slice(1)
  }

  const { data: users } = await connection.helix<
    UsersResponse,
    { id?: string | string[]; login?: string | string[] }
  >({
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
  connection: Connection,
): Promise<HelixUser> {
  const { data: users } = await connection.helix<UsersResponse>({
    method: "GET",
    path: "/users",
  })

  const [{ created_at, ...user }] = users

  return {
    ...user,
    created_at: new Date(created_at),
  }
}
