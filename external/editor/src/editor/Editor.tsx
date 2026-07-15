import { useMemo, useState } from "react"

import Button from "#design/elements/Button"
import Eyebrow from "#design/elements/Eyebrow"
import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import AppLayout from "#design/layouts/AppLayout"
import ItemList from "#design/patterns/ItemList"
import NodeGraph, { NODE_LABELS } from "#design/patterns/NodeGraph"
import Pane from "#design/patterns/Pane"

import { COMPOSITIONS, PIPELINE } from "../data.ts"
import Inspector from "../Inspector/index.ts"

import styles from "./Editor.module.css"

const Editor: React.FC = () => {
  const [compositionId, setCompositionId] = useState(COMPOSITIONS[0].id)
  const [automationId, setAutomationId] = useState(
    COMPOSITIONS[0].automations[0].id,
  )
  const [selectedNode, setSelectedNode] = useState("n1")

  const composition =
    COMPOSITIONS.find((item) => item.id === compositionId) ?? COMPOSITIONS[0]
  const automation =
    composition.automations.find((item) => item.id === automationId) ??
    composition.automations[0]

  const nodes = useMemo(() => PIPELINE.flatMap((section) => section.nodes), [])
  const node = nodes.find((item) => item.id === selectedNode) ?? nodes[0]

  function pickComposition(id: string) {
    const next = COMPOSITIONS.find((item) => item.id === id) ?? COMPOSITIONS[0]
    setCompositionId(id)
    setAutomationId(next.automations[0].id)
  }

  const path = [
    composition.name,
    `${automation.name.toLowerCase().replace(/\s+/g, "-")}.automation`,
  ]

  return (
    <AppLayout
      path={path}
      status="Saved · 2s ago"
      initials="CB"
      actions={
        <Button variant="text" size="small">
          Open dock
        </Button>
      }
    >
      <div className={styles.editor}>
        <Pane
          label="Compositions"
          trailing={
            <Typography role="label" size="small" className={styles.count}>
              {String(COMPOSITIONS.length)}
            </Typography>
          }
          footer={
            <Button variant="dashed" size="xsmall" block>
              + New composition
            </Button>
          }
        >
          <ItemList
            items={COMPOSITIONS}
            active={compositionId}
            onSelect={pickComposition}
          />
        </Pane>

        <Pane
          label="Automations"
          trailing={
            <Typography role="label" size="small" className={styles.count}>
              {String(composition.automations.length)}
            </Typography>
          }
          footer={
            <Button variant="dashed" size="xsmall" block>
              + New automation
            </Button>
          }
        >
          <ItemList
            items={composition.automations}
            active={automationId}
            onSelect={setAutomationId}
          />
        </Pane>

        <Pane
          dotted
          header={
            <div className={styles.canvasTitle}>
              <Typography role="label" size="medium">
                {composition.name}
              </Typography>
              <span className={styles.canvasArrow} aria-hidden="true">
                &rsaquo;
              </span>
              <Typography
                role="label"
                size="medium"
                className={styles.canvasCurrent}
              >
                {automation.name}
              </Typography>
            </div>
          }
          trailing={
            <div className={styles.toolbar}>
              <Button variant="text" size="xsmall" square aria-label="Run once">
                <span className={styles.glyph}>
                  <Icon name="play" />
                </span>
              </Button>
              <Button
                variant="text"
                size="xsmall"
                square
                aria-label="Duplicate"
              >
                <span className={styles.glyph}>
                  <Icon name="copy" />
                </span>
              </Button>
              <Button variant="text" size="xsmall" square aria-label="Delete">
                <span className={styles.glyph}>
                  <Icon name="trash" />
                </span>
              </Button>
            </div>
          }
        >
          <NodeGraph
            sections={PIPELINE}
            selected={selectedNode}
            onSelect={setSelectedNode}
          />
        </Pane>

        <Pane
          surface="raised"
          divided={false}
          header={
            <Eyebrow marker={node.kind} tone="muted" size="small">
              {NODE_LABELS[node.kind]} &middot;{" "}
              <span className={styles.inspectorModule}>{node.module}</span>
            </Eyebrow>
          }
        >
          <Inspector node={node} />
        </Pane>
      </div>
    </AppLayout>
  )
}

export default Editor
