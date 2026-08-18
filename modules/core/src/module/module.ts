import { type FieldsType, type Field } from "./fields.ts"

export type ModuleManifest = {
  label: string
  notes?: string
  editorScript: string
  dockScript: string
  overlayScript: string

  config?: Record<
    string,
    Field & {
      scope?: "editor" | "studio"
      required: boolean
    }
  >

  nodes: Record<string, ModuleNode>
}

export type ModuleManifestResolved = Required<Omit<ModuleManifest, "notes">> &
  Pick<ModuleManifest, "notes">

export type ModuleNode = {
  type: "trigger" | "logic" | "action"
  notes?: string
  inputs?: Record<string, Field & { required: boolean }>
  outputs?: Record<string, Field>
}

export type ModuleConfig = {
  label: string
  module: string
  config?: Record<string, unknown>
}

export type ModuleStore = Record<string, unknown>

type ModuleRunners<Manifest extends ModuleManifest> = {
  editor(
    config: ModuleConfig,
    store: ModuleStore,
  ): Promise<{
    nodes: {
      [Id in keyof Manifest["nodes"]]?: NodeRunner<
        "editor",
        Manifest["nodes"][Id]
      >
    }
  }>
  dock(
    config: ModuleConfig,
    store: ModuleStore,
  ): Promise<{
    close: () => Promise<void>
    nodes: {
      [Id in keyof Manifest["nodes"] as Manifest["nodes"][Id] extends {
        type: "trigger"
      }
        ? Id
        : never]: NodeRunner<"dock", Manifest["nodes"][Id]>
    }
  }>
  overlay(
    config: ModuleConfig,
    store: ModuleStore,
  ): Promise<{
    close: () => Promise<void>
    nodes: {
      [Id in keyof Manifest["nodes"]]: NodeRunner<
        "overlay",
        Manifest["nodes"][Id]
      >
    }
  }>
}

type NodeRunners<Node extends ModuleNode> = {
  editor(
    node: ModuleNode,
    inputs: FieldsType<Node["inputs"]>,
    data: Record<string, unknown>,
  ): Promise<{
    data?: Record<string, unknown>
    outputs?: Partial<FieldsType<Node["outputs"]>>
  }>
  dock(
    node: ModuleNode,
    inputs: FieldsType<Node["inputs"]>,
    data: Record<string, unknown>,
  ): Promise<{
    data?: Record<string, unknown>
    outputs?: Partial<FieldsType<Node["outputs"]>>
  }>
  overlay(
    node: ModuleNode,
    inputs: FieldsType<Node["inputs"]>,
    data: Record<string, unknown>,
  ): Promise<{
    data?: Record<string, unknown>
    outputs?: Partial<FieldsType<Node["outputs"]>>
  }>
}

export type ModuleSurface = keyof ModuleRunners<ModuleManifest>

export type ModuleRunner<
  Surface extends ModuleSurface,
  Manifest extends ModuleManifest = ModuleManifest,
> = ModuleRunners<Manifest>[Surface]

export type ModuleInstance<
  Surface extends ModuleSurface,
  Manifest extends ModuleManifest = ModuleManifest,
> = Awaited<ReturnType<ModuleRunners<Manifest>[Surface]>>

export type NodeRunner<
  Surface extends keyof NodeRunners<ModuleNode>,
  Node extends ModuleNode = ModuleNode,
> = NodeRunners<Node>[Surface]

export type NodeResult<
  Surface extends keyof NodeRunners<ModuleNode>,
  Node extends ModuleNode = ModuleNode,
> = Awaited<ReturnType<NodeRunners<Node>[Surface]>>

declare global {
  interface Window {
    registerOSEditorModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"editor", Manifest>,
    ) => void
    registerOSDockModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"dock", Manifest>,
    ) => void
    registerOSOverlayModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"overlay", Manifest>,
    ) => void
  }
}
