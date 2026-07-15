import cx from "classnames"
import { Fragment } from "react"

import Typography from "#design/elements/Typography"

import Node from "./Node.tsx"
import styles from "./NodeGraph.module.css"
import { type Section } from "./NodeGraph.types.ts"

export type NodeGraphProps = {
  sections: Section[]
  selected?: string
  onSelect?: (id: string) => void
  onInsert?: (kind: Section["kind"]) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">

const NodeGraph: React.FC<NodeGraphProps> = ({
  sections,
  selected,
  onSelect,
  onInsert,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.graph, className)}>
      {sections.map((section, index) => {
        const fork = section.layout === "fork"

        return (
          <Fragment key={section.label}>
            {index > 0 && (
              <span className={styles.connector} aria-hidden="true" />
            )}

            <div className={styles.section}>
              <Typography
                role="label"
                size="small"
                className={styles.sectionLabel}
              >
                {section.label}
              </Typography>

              <div
                className={cx(styles.nodes, fork ? styles.fork : styles.stack)}
              >
                {fork && section.forkLabel && (
                  <span className={styles.forkLabel}>{section.forkLabel}</span>
                )}

                {section.nodes.map((node, nodeIndex) =>
                  fork ? (
                    <div key={node.id} className={styles.branch}>
                      <Node
                        node={node}
                        selected={node.id === selected}
                        onSelect={onSelect}
                      />
                    </div>
                  ) : (
                    <Fragment key={node.id}>
                      {nodeIndex > 0 && (
                        <span className={styles.connector} aria-hidden="true" />
                      )}
                      <Node
                        node={node}
                        selected={node.id === selected}
                        onSelect={onSelect}
                      />
                    </Fragment>
                  ),
                )}
              </div>

              {section.insert && (
                <div className={styles.insert}>
                  <button
                    type="button"
                    className={cx(styles.insertButton, styles[section.kind])}
                    title={section.insert}
                    onClick={() => onInsert?.(section.kind)}
                  >
                    <span aria-hidden="true">+</span>
                    <span className={styles.srOnly}>{section.insert}</span>
                  </button>
                </div>
              )}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default NodeGraph
