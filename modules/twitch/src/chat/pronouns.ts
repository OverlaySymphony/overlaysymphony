type AllPronounsResponse = Array<{
  name: string
  display: string
}>

type UserPronounsResponse = Array<{
  id: string
  login: string
  pronoun_id: string
}>

type Pronouns = {
  subject: string
  object: string
  posessive: string
}

const pronouns: Record<string, Pronouns> = {
  hehim: {
    subject: "he",
    object: "him",
    posessive: "his",
  },
  sheher: {
    subject: "she",
    object: "her",
    posessive: "her",
  },
  theythem: {
    subject: "they",
    object: "them",
    posessive: "their",
  },
  shethem: {
    subject: "she",
    object: "they",
    posessive: "their",
  },
  hethem: {
    subject: "he",
    object: "they",
    posessive: "their",
  },
  heshe: {
    subject: "he",
    object: "she",
    posessive: "their",
  },
  xexem: {
    subject: "xe",
    object: "xem",
    posessive: "xeir",
  },
  faefaer: {
    subject: "fae",
    object: "faer",
    posessive: "faer",
  },
  vever: {
    subject: "ve",
    object: "ver",
    posessive: "ver",
  },
  aeaer: {
    subject: "ae",
    object: "aer",
    posessive: "aer",
  },
  ziehir: {
    subject: "zie",
    object: "hir",
    posessive: "hir",
  },
  perper: {
    subject: "per",
    object: "per",
    posessive: "per",
  },
  eem: {
    subject: "e",
    object: "em",
    posessive: "eir",
  },
  itits: {
    subject: "it",
    object: "its",
    posessive: "its",
  },
}

const cache: Partial<Record<string, keyof typeof pronouns>> = {}

export async function getAllPronouns(): Promise<AllPronounsResponse> {
  const response = await fetch("https://pronouns.alejo.io/api/pronouns")

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const data = (await response.json()) as AllPronounsResponse

  return data
}

export async function getUserPronouns(
  login: string,
): Promise<string | undefined> {
  const response = await fetch(`https://pronouns.alejo.io/api/users/${login}`)

  if (!response.ok) {
    return undefined
  }

  try {
    const data = (await response.json()) as UserPronounsResponse

    return data[0].pronoun_id
  } catch {
    return undefined
  }
}

export async function getPronouns(
  login: string,
  fallback: keyof typeof pronouns = "theythem",
): Promise<{
  subject: string
  object: string
}> {
  if (!(login in cache)) {
    try {
      const id = await getUserPronouns(login)
      cache[login] = id
    } catch {
      cache[login] = undefined
    }
  }

  const id = cache[login] ?? fallback
  return pronouns[id]
}
