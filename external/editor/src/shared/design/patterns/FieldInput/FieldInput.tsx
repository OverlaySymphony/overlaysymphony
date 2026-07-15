import cx from "classnames"
import { type ReactNode } from "react"

import Field from "#design/patterns/Field"

import styles from "./FieldInput.module.css"

export type FieldInputProps = {
  label: string
  help?: string
  prefix?: string
  suffix?: string
  mono?: boolean
  action?: ReactNode
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "style" | "prefix">

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  help,
  prefix,
  suffix,
  mono = false,
  action,
  className,
  ...props
}) => {
  return (
    <Field label={label} help={help}>
      <div className={styles.control}>
        {prefix && (
          <span className={cx(styles.affix, styles.prefix)}>{prefix}</span>
        )}

        <input
          {...props}
          className={cx(styles.input, { [styles.mono]: mono }, className)}
        />

        {suffix && (
          <span className={cx(styles.affix, styles.suffix)}>{suffix}</span>
        )}

        {action !== undefined && <div className={styles.action}>{action}</div>}
      </div>
    </Field>
  )
}

export default FieldInput
