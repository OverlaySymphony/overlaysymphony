import { type Plugin } from "vite"

export default function emitJson(files: Record<string, unknown>): Plugin {
  return {
    name: "emit-config",

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = req.url?.slice(1).split("?")[0] ?? ""
        if (!(file in files)) {
          return next()
        }

        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(files[file], null, 2))
      })
    },

    generateBundle() {
      for (const file in files) {
        this.emitFile({
          type: "asset",
          fileName: file,
          source: JSON.stringify(files[file], null, 2),
        })
      }
    },
  }
}
