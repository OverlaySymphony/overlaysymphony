import cx from "classnames"
import { Fragment } from "react"

import styles from "./Template.module.css"
import { parse, type Tone } from "./Template.types.ts"

export type TemplateProps = {
  value: string
  tone?: Tone
} & React.HTMLAttributes<HTMLSpanElement>

const Template: React.FC<TemplateProps> = ({
  value,
  tone = "trigger",
  className,
  ...props
}) => {
  return (
    <span {...props} className={cx(styles.template, styles[tone], className)}>
      {parse(value).map((segment, index) =>
        segment.token ? (
          <span key={index} className={styles.token}>
            {segment.text}
          </span>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </span>
  )
}

export default Template
