import cx from "classnames"

import styles from "./Logo.module.css"

export type LogoProps = {
  href?: string
  size?: "medium" | "small"
  markOnly?: boolean
} & React.HTMLAttributes<HTMLElement>

const Logo: React.FC<LogoProps> = ({
  href,
  size = "medium",
  markOnly = false,
  className,
  ...props
}) => {
  const classes = cx(styles.logo, styles[size], className)
  const label = markOnly ? "Overlay Symphony" : undefined

  const content = (
    <>
      <span className={styles.mark} aria-hidden="true" />

      {!markOnly && (
        <span className={styles.name}>
          Overlay<span className={styles.accent}>Symphony</span>
        </span>
      )}
    </>
  )

  if (href !== undefined) {
    return (
      <a {...props} href={href} className={classes} aria-label={label}>
        {content}
      </a>
    )
  }

  return (
    <span {...props} className={classes} aria-label={label}>
      {content}
    </span>
  )
}

export default Logo
