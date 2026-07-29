// jsdom has no adoptedStyleSheets; give each node its own array so components can push.
const store = new WeakMap<object, CSSStyleSheet[]>()

for (const proto of [Document.prototype, ShadowRoot.prototype]) {
  if ("adoptedStyleSheets" in proto) continue

  Object.defineProperty(proto, "adoptedStyleSheets", {
    configurable: true,
    get(this: object) {
      let sheets = store.get(this)
      if (!sheets) {
        sheets = []
        store.set(this, sheets)
      }
      return sheets
    },
    set(this: object, sheets: CSSStyleSheet[]) {
      store.set(this, sheets)
    },
  })
}
