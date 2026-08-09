const loading = new Map<string, Promise<void>>()

export async function loadScripts(...scripts: string[]): Promise<void> {
  await Promise.all(scripts.filter(validateScript).map(loadScript))
}

function validateScript(src: string): boolean {
  if (!URL.canParse(src)) {
    throw new Error(`Script must be an absolute URL: ${src}`)
  }

  return true
}

function loadScript(src: string): Promise<void> {
  const pending = loading.get(src)
  if (pending) return pending

  const promise = import(/* @vite-ignore */ src).then(() => undefined)
  loading.set(src, promise)

  promise.catch(() => loading.delete(src))

  return promise
}
