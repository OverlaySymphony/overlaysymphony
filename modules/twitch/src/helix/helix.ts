import querystring from "@overlaysymphony/core/libs/querystring"

import { type Authentication } from "../authentication/index.ts"

export async function helix<Response = never, Params = unknown, Body = never>(
  authentication: Authentication,
  {
    method,
    path,
    params,
    body,
  }: {
    method: string
    path: string
    params?: Params
    body?: Body
  },
): Promise<Response> {
  const queryString = params ? querystring.stringify(params) : ""
  const { bodyString, contentType } = getBodyString(body)

  const url = `https://api.twitch.tv/helix${path}?${queryString}`
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${authentication.accessToken}`,
      "Client-Id": authentication.clientId,
      "Content-Type": contentType,
    },
    body: bodyString,
  })

  if (!response.ok) {
    console.error({ method, path, params, body })
    throw new Error(await response.text())
  }

  const text = await response.text()
  if (!text) {
    return undefined as unknown as Response
  }

  const data = JSON.parse(text) as Response

  // if (cursor) {
  //   return data.concat(await helix<Data>(method, path, params, cursor))
  // }

  return data
}

function getBodyString<Body>(body: Body): {
  bodyString: string
  contentType: string
} {
  if (typeof body === "string") {
    return {
      bodyString: body,
      contentType: "application/x-www-form-urlencoded",
    }
  }

  if (typeof body === "object") {
    return {
      bodyString: JSON.stringify(body),
      contentType: "application/json",
    }
  }

  return {
    bodyString: body as string,
    contentType: undefined as unknown as string,
  }
}
