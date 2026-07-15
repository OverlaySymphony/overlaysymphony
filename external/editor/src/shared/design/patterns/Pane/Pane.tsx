import cx from "classnames"
import { type ReactNode } from "react"

import Typography from "#design/elements/Typography"

import styles from "./Pane.module.css"
import { type Surface } from "./Pane.types.ts"

export type PaneProps = {
  label?: string
  header?: ReactNode
  trailing?: ReactNode
  footer?: ReactNode
  surface?: Surface
  dotted?: boolean
  divided?: boolean
} & React.HTMLAttributes<HTMLElement>

const Pane: React.FC<PaneProps> = ({
  label,
  header,
  trailing,
  footer,
  surface = "base",
  dotted = false,
  divided = true,
  className,
  children,
  ...props
}) => {
  const hasHeader =
    Boolean(label) || header !== undefined || trailing !== undefined

  return (
    <section
      {...props}
      className={cx(
        styles.pane,
        styles[surface],
        { [styles.divided]: divided },
        className,
      )}
    >
      {hasHeader && (
        <header className={styles.head}>
          {header ??
            (label && (
              <Typography role="label" size="small" className={styles.label}>
                {label}
              </Typography>
            ))}

          {trailing}
        </header>
      )}

      <div className={cx(styles.body, { [styles.dotted]: dotted })}>
        {children}
      </div>

      {footer !== undefined && (
        <footer className={styles.foot}>{footer}</footer>
      )}
    </section>
  )
}

export default Pane
