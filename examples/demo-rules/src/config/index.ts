import app from "./app.ts"
import compositionAlerts from "./composition-alerts.ts"
import compositionChat from "./composition-chat.ts"
import compositionGames from "./composition-games.ts"

const files = {
  [`config/app-${app.id}.json`]: app,
  [`config/composition-${compositionAlerts.id}.json`]: compositionAlerts,
  [`config/composition-${compositionChat.id}.json`]: compositionChat,
  [`config/composition-${compositionGames.id}.json`]: compositionGames,
}

export default files
