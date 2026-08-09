import { type ModuleConfig } from "../module/index.ts"

export type CompositionConfig = {
  id: string
  label: string
  notes?: string
  secretKey: CryptoKey
  modules: Record<string, ModuleConfig>
  automations: Record<string, AutomationConfig>
}

export type CompositionConfigRaw = Omit<
  CompositionConfig,
  "secretKey" | "modules"
> & {
  secretKey: string
  modules?: CompositionConfig["modules"]
}

export type AutomationConfig =
  | {
      type: "rule"
      notes?: string
      trigger: AutomationNode
      conditions?: Record<string, AutomationNode>
      actions: Record<string, AutomationNode>
    }
  | {
      type: "flow"
      notes?: string
      nodes: Record<string, AutomationNode>
      edges: Record<string, AutomationEdge>
    }

type AutomationNode = {
  moduleId: string
  node: string
  config?: Record<string, unknown>
}

type AutomationEdge = {
  sourceNodeId: string
  sourceOutput: string
  targetNodeId: string
  targetInput: string
}
