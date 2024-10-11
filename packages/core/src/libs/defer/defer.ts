export default function createDefer<Data = void>(): {
  promise: Promise<Data>
  resolve: (value: Data) => void
  reject: (reason?: string) => void
} {
  let resolve: ((value: Data) => void) | undefined = undefined
  let reject: ((reason?: string) => void) | undefined = undefined

  const promise = new Promise<Data>((resolve_, reject_) => {
    resolve = resolve_
    reject = reject_
  })

  return {
    promise,
    resolve: resolve as Exclude<typeof resolve, undefined>,
    reject: reject as Exclude<typeof reject, undefined>,
  }
}
