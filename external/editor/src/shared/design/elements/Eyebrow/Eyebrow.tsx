import cx from "classnames"
import { type CSSProperties } from "react"

import styles from "./Eyebrow.module.css"
import { type Size, type Tone, TONE_COLORS } from "./Eyebrow.types.ts"

export type EyebrowProps = {
  marker?: boolean | Tone
  index?: string
  tone?: Tone
  size?: Size
} & React.HTMLAttributes<HTMLSpanElement>

const Eyebrow: React.FC<EyebrowProps> = ({
  marker = false,
  index,
  tone = index ? "muted" : "accent",
  size = "large",
  className,
  style,
  children,
  ...props
}) => {
  const markerTone = typeof marker === "string" ? marker : tone

  const rootStyle = {
    ...style,
    "--eyebrow-color": TONE_COLORS[tone],
    "--eyebrow-marker": TONE_COLORS[markerTone],
    "--eyebrow-size": `var(--os-label-${size}-size)`,
    "--eyebrow-weight": `var(--os-label-${size}-weight)`,
    "--eyebrow-tracking": `var(--os-label-${size}-tracking)`,
    "--eyebrow-leading": `var(--os-label-${size}-leading)`,
  } as CSSProperties

  return (
    <span
      {...props}
      className={cx(styles.eyebrow, className)}
      style={rootStyle}
    >
      {marker && <span className={styles.marker} aria-hidden="true" />}
      {index && <span className={styles.index}>{index}</span>}
      {index && (
        <span className={styles.separator} aria-hidden="true">
          /
        </span>
      )}
      {children}
    </span>
  )
}

export default Eyebrow
