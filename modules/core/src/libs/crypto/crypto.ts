export type Encrypted = { iv: string; ciphertext: string }

export async function generateKey(): Promise<CryptoKey> {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  )

  return key
}

export async function stringifyKey(key: CryptoKey): Promise<string> {
  const jwk = await crypto.subtle.exportKey("jwk", key)

  return JSON.stringify(jwk)
}

export async function parseKey(key: string): Promise<CryptoKey> {
  const jwk = JSON.parse(key) as JsonWebKey

  return crypto.subtle.importKey("jwk", jwk, { name: "AES-GCM" }, true, [
    "encrypt",
    "decrypt",
  ])
}

export async function encrypt(
  key: CryptoKey,
  message: string,
): Promise<Encrypted> {
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(message),
  )

  return {
    iv: iv.toBase64(),
    ciphertext: new Uint8Array(ciphertext).toBase64(),
  }
}

export async function decrypt(
  key: CryptoKey,
  input: Encrypted,
): Promise<string> {
  const iv = Uint8Array.fromBase64(input.iv)
  const ciphertext = Uint8Array.fromBase64(input.ciphertext)

  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  )

  return new TextDecoder().decode(plainBuf)
}

export async function hash(key: CryptoKey, message: string): Promise<string> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(message),
  )
  const iv = new Uint8Array(hash).slice(0, 12)

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(message),
  )

  return new Uint8Array(ciphertext).toBase64()
}
