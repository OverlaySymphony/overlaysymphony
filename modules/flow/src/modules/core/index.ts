import { registerEdgeComponents, registerNodeComponents } from "#shared/Canvas"

import edges from "./edges/index.ts"
import nodes from "./nodes/index.ts"

registerNodeComponents(nodes)
registerEdgeComponents(edges)
