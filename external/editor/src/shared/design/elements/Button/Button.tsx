import cx from "classnames"
import { type ReactNode } from "react"

import styles from "./Button.module.css"
import { type Size, type Tone, type Variant } from "./Button.types.ts"

export type ButtonProps = {
  variant?: Variant
  size?: Size
  tone?: Tone
  arrow?: boolean
  square?: boolean
  block?: boolean
  href?: string
  className?: string
  children?: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  tone = "accent",
  arrow = false,
  square = false,
  block = false,
  href,
  className,
  children,
  ...props
}) => {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    styles[tone],
    { [styles.square]: square, [styles.block]: block },
    className,
  )

  const content = (
    <>
      {children}
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      )}
    </>
  )

  if (href !== undefined) {
    return (
      <a {...props} href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" {...props} className={classes}>
      {content}
    </button>
  )
}

export default Button
