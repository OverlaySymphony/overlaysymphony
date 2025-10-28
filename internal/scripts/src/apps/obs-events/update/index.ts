const response = await fetch(
  "https://github.com/obsproject/obs-browser/latest-commit/master/README.md",
  {
    headers: {
      accept: "application/json",
    },
  },
)

const lastCommit = (await response.json()) as { oid: string }

if (lastCommit.oid !== "06747866b160d953d4e33cf06916390a138e6cfa") {
  throw new Error(
    "README has updated. Please check https://github.com/obsproject/obs-browser/blob/master/README.md",
  )
}
