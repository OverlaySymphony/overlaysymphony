import cx from "classnames"
import { Fragment, type ReactNode } from "react"

import Eyebrow from "#design/elements/Eyebrow"
import Logo from "#design/elements/Logo"

import Avatar from "./Avatar.tsx"
import styles from "./TopBar.module.css"

export type TopBarProps = {
  path?: string[]
  status?: string
  initials?: string
  actions?: ReactNode
}

const TopBar: React.FC<TopBarProps> = ({
  path = [],
  status,
  initials,
  actions,
}) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <Logo href="/" />
      </div>

      <nav className={styles.path}>
        {path.map((segment, index) => (
          <Fragment key={segment}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
            )}
            <span
              className={cx({ [styles.current]: index === path.length - 1 })}
            >
              {segment}
            </span>
          </Fragment>
        ))}
      </nav>

      <div className={styles.actions}>
        {actions}

        {status && (
          <Eyebrow marker="accent" tone="muted" size="medium">
            {status}
          </Eyebrow>
        )}

        {initials && <Avatar initials={initials} />}
      </div>
    </header>
  )
}

export default TopBar
