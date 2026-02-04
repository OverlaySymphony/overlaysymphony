export interface FlowModuleConfigs {}
export type FlowModuleType = keyof FlowModuleConfigs

export type FlowModuleConfig<
  Type extends string,
  Data extends Record<string, unknown>,
> = {
  type: Type
  data: Data
}

export type FlowModule<Type extends FlowModuleType = FlowModuleType> = {
  id: string
  name: string
  type: FlowModuleConfigs[Type]["type"]
  data: FlowModuleConfigs[Type]["data"]
}

export type FlowModuleCreator<Type extends FlowModuleType> = (
  ...args: unknown[]
) => Promise<FlowModule<Type>>

export const moduleConfigs: {
  [Type in FlowModuleType]?: {
    logic: FlowModuleCreator<Type>
  }
} = {}

export function registerModule<Type extends FlowModuleType>(
  type: Type,
  comonent: FlowModuleCreator<Type>,
): void {
  // @ts-expect-error too complex for typescript
  moduleConfigs[type] = comonent
}
