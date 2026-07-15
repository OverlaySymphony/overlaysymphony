import cx from "classnames"
import { type ReactNode } from "react"

import styles from "./Icon.module.css"
import { type IconName } from "./Icon.types.ts"

export type IconProps = {
  name: IconName
} & React.SVGAttributes<SVGSVGElement>

const PATHS: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  browser: (
    <>
      <rect x="2.5" y="5" width="19" height="14" />
      <path d="M2.5 9 H21.5" />
      <circle cx="5.5" cy="7" r="0.6" fill="currentColor" />
    </>
  ),
  signal: (
    <>
      <path d="M4 18 L20 18" />
      <path d="M8 14 L8 18" />
      <path d="M12 8 L12 18" />
      <path d="M16 11 L16 18" />
      <path d="M3 6 L21 6" strokeDasharray="2 3" />
    </>
  ),
  nodes: (
    <>
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6.5 6.5 L11 17.5" />
      <path d="M17.5 6.5 L13 17.5" />
    </>
  ),
  chat: (
    <>
      <path d="M3 5 H21 V16 H12 L7 20 V16 H3 Z" />
      <path d="M7 9 H17" />
      <path d="M7 12.5 H13" />
    </>
  ),
  scene: (
    <>
      <rect x="2.5" y="4" width="19" height="13" />
      <path d="M2.5 17 L21.5 17" />
      <path d="M8 20.5 H16" />
      <path d="M12 17 V20.5" />
      <circle cx="16.5" cy="8" r="2" />
    </>
  ),
  play: <path d="M7 5 L19 12 L7 19 Z" fill="currentColor" stroke="none" />,
  copy: (
    <>
      <rect x="4" y="4" width="12" height="12" />
      <rect x="9" y="9" width="12" height="12" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7 H20" />
      <path d="M7 7 V20 H17 V7" />
      <path d="M9 7 V4 H15 V7" />
    </>
  ),
}

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <svg
      {...props}
      className={cx(styles.icon, className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

export default Icon
