import cx from "classnames"

import Typography from "#design/elements/Typography"

import styles from "./Field.module.css"

export type FieldProps = {
  label: string
  help?: string
} & React.HTMLAttributes<HTMLDivElement>

const Field: React.FC<FieldProps> = ({
  label,
  help,
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.field, className)}>
      <Typography
        as="label"
        role="label"
        size="medium"
        className={styles.label}
      >
        {label}
      </Typography>

      {children}

      {help && (
        <Typography as="p" role="body" size="small" className={styles.help}>
          {help}
        </Typography>
      )}
    </div>
  )
}

export default Field
