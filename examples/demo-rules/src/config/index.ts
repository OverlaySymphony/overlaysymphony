import compositionAlerts from "./composition-alerts.ts"
import compositionChat from "./composition-chat.ts"
import compositionCore from "./composition-core.ts"
import compositionGames from "./composition-games.ts"
import ensemble from "./ensemble.ts"

const files = {
  [`config/ensemble-${ensemble.id}.json`]: ensemble,
  [`config/composition-${compositionAlerts.id}.json`]: compositionAlerts,
  [`config/composition-${compositionChat.id}.json`]: compositionChat,
  [`config/composition-${compositionCore.id}.json`]: compositionCore,
  [`config/composition-${compositionGames.id}.json`]: compositionGames,
}

export default files
