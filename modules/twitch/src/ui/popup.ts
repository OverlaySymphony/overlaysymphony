import querystring from "@overlaysymphony/core/libs/querystring"

import {
  authenticateResult,
  initiateAuthentication,
} from "../authentication/index.js"

const state = getState()

if (state.step === "initial") {
  window.location.href = initiateAuthentication(
    state.clientId,
    `${window.location.origin}${window.location.pathname}`,
    state.scopes,
  )
}

if (state.step === "token") {
  const authentication = await authenticateResult(state.clientId, state)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  window.opener.postMessage({ type: "authentication", authentication }, "*")
  window.close()
}

if (state.step === "error") {
  alert(`${state.error}. ${state.description ?? ""}`)
}

function getState():
  | {
      step: "initial"
      clientId: string
      scopes: string[]
    }
  | {
      step: "token"
      clientId: string
      token_type: "bearer"
      access_token: string
      scope: string
    }
  | {
      step: "error"
      error: string
      description?: string
    } {
  const query = querystring.parse(window.location.search)
  const hash = querystring.parse(window.location.hash)

  if (hash.token_type === "bearer") {
    const token_type = hash.token_type
    const access_token = validateString(hash.access_token)
    const scope = validateString(hash.scope)
    const clientId = validateString(hash.state)

    if (!access_token || !scope || !clientId) {
      return {
        step: "error",
        error: "Token Error",
        description: [
          !access_token ? "Missing access_token." : "",
          !scope ? "Missing scope." : "",
          !clientId ? "Missing state." : "",
        ]
          .filter(Boolean)
          .join(" "),
      }
    }

    return {
      step: "token",
      clientId,
      token_type,
      access_token,
      scope,
    }
  }

  if ("scopes" in query) {
    const clientId = validateString(query.clientId)
    const scopes = validateString(query.scopes)?.split("+")

    if (!clientId || !scopes) {
      return {
        step: "error",
        error: "Initialization Error",
        description: [
          !clientId ? "Missing clientId." : "",
          !scopes ? "Missing scopes." : "",
        ]
          .filter(Boolean)
          .join(" "),
      }
    }

    return {
      step: "initial",
      clientId,
      scopes,
    }
  }

  return {
    step: "error",
    error: validateString(query.error) ?? "Unknown Error",
    description: validateString(query.error_description),
  }
}

function validateString(input: unknown): string | undefined {
  if (typeof input !== "string" || !input) {
    return undefined
  }

  return input
}
