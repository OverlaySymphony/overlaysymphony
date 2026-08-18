type FieldDefinitions = {
  placeholder: {
    type: unknown
    config: {}
  }
  fields: {
    type: {}
    config: {
      fields: Record<string, Field & { required: boolean }>
    }
  }
  string: {
    type: string
    config: {}
  }
  number: {
    type: number
    config: {}
  }
  boolean: {
    type: boolean
    config: {}
  }
  custom: {
    type: {}
    config: {
      script: string
      element: string
    }
  }
}

export type Field<
  Type extends keyof FieldDefinitions = keyof FieldDefinitions,
> = Type extends Type
  ? {
      type: Type
      label: string
      notes?: string
    } & FieldDefinitions[Type]["config"]
  : never

export type FieldType<
  Type extends keyof FieldDefinitions = keyof FieldDefinitions,
> = Type extends Type ? FieldDefinitions[Type]["type"] : never

export type FieldsType<Fields> =
  Fields extends Record<string, Field>
    ? {
        [Key in keyof Fields]: Fields[Key] extends { required: true }
          ? FieldType<Fields[Key]["type"]>
          : FieldType<Fields[Key]["type"]> | undefined
      }
    : null
