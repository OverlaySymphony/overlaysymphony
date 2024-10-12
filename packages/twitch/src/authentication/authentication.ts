import querystring from "@overlaysymphony/core/libs/querystring"

import { TwitchUser, getUsers } from "../helix/users/index.js"

export interface Authentication {
  clientId: string
  tokenType: "bearer"
  accessToken: string
  scope: string[]
  expires: Date
  user: TwitchUser
}

export type BareAuthentication = Omit<Authentication, "user">

interface TAValidation {
  client_id: string
  login: string
  scope: string[]
  user_id: string
  expires_in: number
}

interface TAResult {
  token_type: "bearer"
  access_token: string
  scope: string
}

const localStorageKey = "overlaysymphony:service:twitch"

export async function getAuthentication(): Promise<Authentication> {
  const raw = localStorage.getItem(localStorageKey)
  if (!raw) {
    throw new Error("Twitch authentication missing!")
  }

  const cached = JSON.parse(raw) as BareAuthentication
  cached.expires = new Date(cached.expires)

  const [user] = await getUsers(cached as Authentication)

  const authentication: Authentication = {
    ...cached,
    user,
  }

  return authentication
}

export function initiateAuthentication(
  clientId: string,
  redirect: string,
  scope: string[],
): string {
  return `https://id.twitch.tv/oauth2/authorize?${querystring.stringify({
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirect,
    scope: scope.join("+"),
    state: clientId,
  })}`
}

export async function validateAuthentication(
  authentication: Omit<BareAuthentication, "expires">,
): Promise<BareAuthentication> {
  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authentication.accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const validated = (await response.json()) as TAValidation

  if (validated.client_id !== authentication.clientId) {
    throw new Error("ClientId mismatch.")
  }

  return {
    ...authentication,
    expires: new Date(Date.now() + validated.expires_in * 1000),
  }
}

export async function authenticateResult(
  clientId: string,
  result: TAResult,
): Promise<BareAuthentication> {
  if (!result.token_type || !result.access_token || !result.scope) {
    throw new Error("Invalid result.")
  }

  const authentication = await validateAuthentication({
    clientId,
    tokenType: result.token_type,
    accessToken: result.access_token,
    scope: result.scope.split("+"),
  })

  return authentication
}
