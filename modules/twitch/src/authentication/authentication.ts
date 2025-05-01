import { type TwitchUser, getUsers } from "../helix/users/index.js"

export interface Authentication {
  tokenType: "bearer"
  clientId: string
  accessToken: string
  scope: string[]
  expires: Date
  user: TwitchUser
}

export type BareAuthentication = Omit<Authentication, "user">

const localStorageKey = "overlaysymphony:service:twitch"

export function getCachedAuthentication(
  scopes?: string[],
): BareAuthentication | undefined {
  const cache = localStorage.getItem(localStorageKey)
  if (!cache) {
    return undefined
  }

  const authentication = JSON.parse(cache) as BareAuthentication
  authentication.expires = new Date(authentication.expires)

  if (scopes) {
    for (const scope of scopes) {
      if (!authentication.scope.includes(scope)) {
        localStorage.removeItem(localStorageKey)
        return undefined
      }
    }
  }

  return authentication
}

export function setCachedAuthentication(
  authentication: BareAuthentication,
): void {
  localStorage.setItem(localStorageKey, JSON.stringify(authentication))
}

export function clearCachedAuthentication(): void {
  localStorage.removeItem(localStorageKey)
}

export async function getAuthentication(
  scopes?: string[],
): Promise<Authentication | undefined> {
  let authentication = getCachedAuthentication(scopes)
  if (!authentication) {
    return undefined
  }

  try {
    authentication = await validateAuthentication(authentication)
  } catch (error) {
    clearCachedAuthentication()
    return undefined
  }

  const [user] = await getUsers(authentication as Authentication)

  return {
    ...authentication,
    user,
  }
}

export async function setAuthentication(
  clientId: string,
  accessToken: string,
  scope: string[] = [],
): Promise<BareAuthentication | undefined> {
  let authentication: BareAuthentication = {
    tokenType: "bearer",
    clientId,
    accessToken,
    scope,

    // this is ignored and replaced by validateAuthentication
    expires: new Date(),
  }

  try {
    authentication = await validateAuthentication(authentication)
  } catch (error) {
    return undefined
  }

  setCachedAuthentication(authentication)

  return authentication
}

export async function popupAuthentication(
  clientId: string,
  scopes: string[],
  popupUrl: string,
): Promise<void> {
  const url = new URL(
    `${popupUrl}?scopes=${scopes.join("+")}&clientId=${clientId}`,
  )

  await new Promise<void>((resolve) => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== url.origin) return

      // const source = (event.source as Window | null)?.name
      // if (source !== "OverlaySymphonyTwitchAuthenticationPopup") return

      const { type, authentication } = event.data
      if (type !== "authentication") return

      window.removeEventListener("message", listener)

      setCachedAuthentication(authentication as BareAuthentication)
      resolve()
    }

    window.addEventListener("message", listener)

    window.open(
      url,
      "OverlaySymphonyTwitchAuthenticationPopup",
      "width=520,height=840",
    )
  })
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

  const validated = (await response.json()) as {
    client_id: string
    login: string
    scope: string[]
    user_id: string
    expires_in: number
  }

  if (validated.client_id !== authentication.clientId) {
    throw new Error("ClientId mismatch.")
  }

  return {
    ...authentication,
    expires: new Date(Date.now() + validated.expires_in * 1000),
  }
}
