import { type FlowGraph } from "./graph.ts"
import { type FlowModule } from "./module.ts"

export type FlowApp = {
  modules: Record<string, FlowModule>
  graphs: FlowGraph[]
}
