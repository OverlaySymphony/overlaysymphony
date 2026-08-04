type Fields = {
  string: {}
  "token-string": {}
  custom: {
    script: string
    element: string
  }
}

export type Field<Type extends keyof Fields = keyof Fields> = {
  type: Type
} & Fields[Type]
