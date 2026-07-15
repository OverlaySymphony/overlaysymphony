import cx from "classnames"

import Field from "#design/patterns/Field"

import styles from "./FieldSelect.module.css"
import { type Option } from "./FieldSelect.types.ts"

export type FieldSelectProps = {
  label: string
  help?: string
  options: Option[]
  className?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "style">

const FieldSelect: React.FC<FieldSelectProps> = ({
  label,
  help,
  options,
  className,
  ...props
}) => {
  return (
    <Field label={label} help={help}>
      <select {...props} className={cx(styles.select, className)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export default FieldSelect
