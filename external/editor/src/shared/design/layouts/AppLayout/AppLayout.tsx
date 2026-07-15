import cx from "classnames"
import { type ReactNode } from "react"

import styles from "./AppLayout.module.css"
import TopBar from "./TopBar.tsx"

export type AppLayoutProps = {
  path?: string[]
  status?: string
  initials?: string
  actions?: ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const AppLayout: React.FC<AppLayoutProps> = ({
  path,
  status,
  initials,
  actions,
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.app, className)}>
      <TopBar
        path={path}
        status={status}
        initials={initials}
        actions={actions}
      />

      <main className={styles.body}>{children}</main>
    </div>
  )
}

export default AppLayout
