import cx from "classnames"

import Eyebrow from "#design/elements/Eyebrow"

import styles from "./Node.module.css"
import { type Node as NodeData, NODE_LABELS } from "./NodeGraph.types.ts"

export type NodeProps = {
  node: NodeData
  selected?: boolean
  onSelect?: (id: string) => void
}

const Node: React.FC<NodeProps> = ({ node, selected = false, onSelect }) => {
  return (
    <button
      type="button"
      className={cx(styles.node, styles[node.kind], {
        [styles.selected]: selected,
      })}
      onClick={() => onSelect?.(node.id)}
    >
      <span className={styles.head}>
        <Eyebrow marker tone={node.kind} size="small">
          {NODE_LABELS[node.kind]}
          <span className={styles.module}>&middot; {node.module}</span>
        </Eyebrow>

        <span className={styles.handle}>{node.id}</span>
      </span>

      <span className={styles.title}>{node.title}</span>
      {node.meta && <span className={styles.meta}>{node.meta}</span>}
    </button>
  )
}

export default Node
