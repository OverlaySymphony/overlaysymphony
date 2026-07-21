import { type Plugin, createFilter } from "vite"

export function importCssStyleSheets(): Plugin {
  const filter = createFilter(["/**/*.css"], ["/**/*.global.css"])

  return {
    name: "css-style-sheets",

    enforce: "pre",

    async resolveId(id, importer, options) {
      // TODO: check options.attributes for { type: "css" }

      const modulePath = await this.resolve(id, importer)
      if (!modulePath?.id) return null

      const [file, params] = modulePath?.id.split("?") ?? []
      if (!filter(file)) return null

      const searchParams = new URLSearchParams(params)
      searchParams.set("raw", "")

      modulePath.id = `${file}?${searchParams}`

      return modulePath
    },

    transform(src, id) {
      const [file] = id.split("?") ?? []
      if (!filter(file)) return null

      return {
        code: `const stylesheet = new CSSStyleSheet(); stylesheet.replaceSync(\`${src}\`); export default stylesheet;`,
      }
    },
  }
}
