import cx from "classnames"
import {
  createElement,
  type CSSProperties,
  Fragment,
  type ReactNode,
} from "react"

import { isTokenizable, type Token, tokenize } from "./tokenizer.ts"
import styles from "./Typography.module.css"
import { type Role, type Size } from "./Typography.types.ts"

export type TypographyProps = {
  as?: keyof React.JSX.IntrinsicElements
  role?: Role
  size?: Size
} & React.HTMLAttributes<HTMLElement>

function renderTokens(tokens: Token["children"]): ReactNode {
  return tokens.map((token, index) => {
    if (token === undefined) return null
    if (typeof token === "string")
      return <Fragment key={index}>{token}</Fragment>

    return createElement(
      token.tag,
      { key: index, ...token.props },
      renderTokens(token.children),
    )
  })
}

const Typography: React.FC<TypographyProps> = ({
  as = "span",
  role = "body",
  size = "medium",
  className,
  style,
  children,
  ...props
}) => {
  const rootStyle = {
    ...style,
    "--typography-size": `var(--os-${role}-${size}-size)`,
    "--typography-weight": `var(--os-${role}-${size}-weight)`,
    "--typography-tracking": `var(--os-${role}-${size}-tracking)`,
    "--typography-leading": `var(--os-${role}-${size}-leading)`,
  } as CSSProperties

  return createElement(
    as,
    {
      ...props,
      className: cx(styles.typography, styles[role], className),
      style: rootStyle,
    },
    isTokenizable(children) ? renderTokens(tokenize(children)) : children,
  )
}

export default Typography
