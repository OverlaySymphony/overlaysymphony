type Fields = {
  placeholder: {}
  fields: {
    fields: Record<string, Field & { required: boolean }>
  }
  string: {}
  "token-string": {}
  number: {}
  boolean: {}
  custom: {
    script: string
    element: string
  }
}

export type Field<Type extends keyof Fields = keyof Fields> = Type extends Type
  ? {
      type: Type
      label: string
      notes?: string
    } & Fields[Type]
  : never
