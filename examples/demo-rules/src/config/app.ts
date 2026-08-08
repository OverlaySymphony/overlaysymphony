import { type AppConfigString } from "studio/controller"

const app: AppConfigString = {
  id: "demo",
  label: "Rules Demo",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "klsf1a5I086Zn_4e1MB3txuPORq4xEUFNomlKjjtJ2M",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  modules: {
    twitch: {
      label: "Twitch",
      module: "twitch",
    },
  },
}

export default app
