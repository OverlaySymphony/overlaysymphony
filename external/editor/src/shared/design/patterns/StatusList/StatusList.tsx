import cx from "classnames"
import { useState } from "react"

import Template from "#design/patterns/Template"

import styles from "./StatusList.module.css"
import { type StatusItem } from "./StatusList.types.ts"

export type StatusListProps = {
  items: StatusItem[]
  copyable?: boolean
} & React.HTMLAttributes<HTMLUListElement>

const StatusList: React.FC<StatusListProps> = ({
  items,
  copyable = false,
  className,
  ...props
}) => {
  const [copied, setCopied] = useState<string | null>(null)

  function copy(key: string) {
    void navigator.clipboard.writeText(key)
    setCopied(key)
    setTimeout(
      () => setCopied((current) => (current === key ? null : current)),
      1200,
    )
  }

  return (
    <ul {...props} className={cx(styles.list, className)}>
      {items.map((item) => {
        const value = copied === item.key ? "copied" : item.value
        const inner = (
          <>
            <Template
              value={item.key}
              tone={item.tone}
              className={styles.key}
            />
            {value && (
              <span
                className={cx(styles.value, {
                  [styles.copied]: copied === item.key,
                })}
              >
                {value}
              </span>
            )}
          </>
        )

        return (
          <li key={item.key}>
            {copyable ? (
              <button
                type="button"
                className={styles.row}
                title="Copy"
                onClick={() => copy(item.key)}
              >
                {inner}
              </button>
            ) : (
              <span className={styles.row}>{inner}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default StatusList
