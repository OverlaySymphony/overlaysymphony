import { type FieldsType, type Field } from "./fields.ts"

export type ModuleManifest = {
  label: string
  notes?: string
  editorScript: string
  ownerScript: string
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

export type ModuleInstance = Record<
  string,
  (...args: never[]) => Promise<unknown>
>

export type ModuleEvent = { id: string } & Record<string, unknown>

type ModuleRunners<
  Manifest extends ModuleManifest,
  Instance extends ModuleInstance,
> = {
  editor(
    config: ModuleConfig,
    store: ModuleStore,
  ): Promise<{
    nodes: {
      [Id in keyof Manifest["nodes"]]?: NodeSignatures<
        Manifest["nodes"][Id],
        Instance
      >["editor"]
    }
  }>

  owner(
    config: ModuleConfig,
    store: ModuleStore,
    emit: (event: ModuleEvent) => void,
  ): Promise<{
    instance: Instance
    close: () => Promise<void>
    subscribers: {
      [Id in TriggerId<Manifest>]: NodeSignatures<
        Manifest["nodes"][Id],
        Instance
      >["subscribe"]
    }
    matchers: {
      [Id in TriggerId<Manifest>]: NodeSignatures<
        Manifest["nodes"][Id],
        Instance
      >["match"]
    }
  }>

  overlay(
    config: ModuleConfig,
    store: ModuleStore,
  ): Promise<{
    nodes: {
      [Id in keyof Manifest["nodes"]]: NodeSignatures<
        Manifest["nodes"][Id],
        Instance
      >["overlay"]
    }
  }>
}

export type ModuleSurface = keyof ModuleRunners<ModuleManifest, ModuleInstance>

export type ModuleRunner<
  Surface extends ModuleSurface,
  Manifest extends ModuleManifest = ModuleManifest,
  Instance extends ModuleInstance = ModuleInstance,
> = ModuleRunners<Manifest, Instance>[Surface]

export type ModuleRuntime<
  Surface extends ModuleSurface,
  Manifest extends ModuleManifest = ModuleManifest,
  Instance extends ModuleInstance = ModuleInstance,
> = Awaited<ReturnType<ModuleRunners<Manifest, Instance>[Surface]>>

type TriggerId<Manifest extends ModuleManifest> = {
  [Id in keyof Manifest["nodes"]]: Manifest["nodes"][Id] extends {
    type: "trigger"
  }
    ? Id
    : never
}[keyof Manifest["nodes"]]

// method syntax, not properties: these are compared bivariantly, which is what
// lets a runner written against one manifest satisfy the erased runner type
type NodeSignatures<
  Node extends ModuleNode,
  Instance extends ModuleInstance,
> = {
  editor(
    node: ModuleNode,
    inputs: FieldsType<Node["inputs"]>,
    data: Record<string, unknown>,
  ): Promise<{
    data?: Record<string, unknown>
    outputs?: Partial<FieldsType<Node["outputs"]>>
  }>

  overlay(
    instance: Instance,
    node: ModuleNode,
    inputs: FieldsType<Node["inputs"]>,
    data: Record<string, unknown>,
  ): Promise<{
    data?: Record<string, unknown>
    outputs?: Partial<FieldsType<Node["outputs"]>>
  }>

  subscribe(
    instance: Instance,
    inputs: FieldsType<Node["inputs"]>,
    emit: (eventId: string) => void,
  ): Promise<() => Promise<void>>

  match(
    instance: Instance,
    inputs: FieldsType<Node["inputs"]>,
    event: ModuleEvent,
  ): Promise<boolean>
}

declare global {
  interface Window {
    registerOSEditorModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"editor", Manifest>,
    ) => void
    registerOSOwnerModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"owner", Manifest>,
    ) => void
    registerOSOverlayModule?: <Manifest extends ModuleManifest>(
      script: string,
      runner: ModuleRunner<"overlay", Manifest>,
    ) => void
  }
}
