import { type ModuleConfig } from "./module.ts"

export type CompositionConfig = {
  id: string
  label: string
  notes?: string
  secretKey: CryptoKey
  modules: Record<string, ModuleConfig>
  automations: Record<string, AutomationConfig>
}

export type AutomationConfig =
  | {
      type: "rule"
      trigger: AutomationNode
      conditions: Record<string, AutomationNode>
      actions: Record<string, AutomationNode>
    }
  | {
      type: "flow"
      nodes: Record<string, AutomationNode>
      edges: Record<string, AutomationEdge>
    }

type AutomationNode = {
  moduleId: string
  node: string
  config: Record<string, unknown>
}

type AutomationEdge = {
  sourceNodeId: string
  sourceOutput: string
  targetNodeId: string
  targetInput: string
}

export const mockCompositionConfig = {
  id: "mock",
  label: "Mock Composition",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "Xqr07VhHiPvbxnrmQmYPcbjj5r5TpEOy_ucV7v6pCXM",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  modules: {},
  automations: {},
} satisfies Omit<CompositionConfig, "secretKey"> & { secretKey: string }
