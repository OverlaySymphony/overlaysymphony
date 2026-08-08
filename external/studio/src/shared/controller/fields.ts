type Fields = {
  string: {}
  "token-string": {}
  number: {}
  boolean: {}
  custom: {
    script: string
    element: string
  }
}

export type Field<Type extends keyof Fields = keyof Fields> = {
  type: Type
  label: string
  notes?: string
} & Fields[Type]
