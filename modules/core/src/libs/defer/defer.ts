export default function createDefer<Data = void>(): {
  promise: Promise<Data>
  resolve: (value: Data) => void
  reject: (error?: string | Error) => void
} {
  let resolve: ((value: Data) => void) | undefined = undefined
  let reject: ((error?: string | Error) => void) | undefined = undefined

  const promise = new Promise<Data>((resolve_, reject_) => {
    resolve = resolve_
    reject = (error) =>
      reject_(error instanceof Error ? error : new Error(error))
  })

  return {
    promise,
    resolve: resolve as Exclude<typeof resolve, undefined>,
    reject: reject as Exclude<typeof reject, undefined>,
  }
}
