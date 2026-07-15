import Button from "#design/elements/Button"
import Typography from "#design/elements/Typography"
import FieldInput from "#design/patterns/FieldInput"
import FieldSelect from "#design/patterns/FieldSelect"
import { type Node } from "#design/patterns/NodeGraph"
import StatusList from "#design/patterns/StatusList"

import styles from "./Inspector.module.css"

const MODULE_OPTIONS = [
  { value: "twitch", label: "Twitch" },
  { value: "obs", label: "OBS" },
  { value: "audio", label: "Audio" },
  { value: "overlay", label: "Overlay" },
  { value: "viewer", label: "Viewer" },
  { value: "timer", label: "Timer" },
  { value: "webhook", label: "Webhook" },
]

export type InspectorProps = {
  node: Node
}

const Inspector: React.FC<InspectorProps> = ({ node }) => {
  return (
    <div className={styles.inspector}>
      {node.kind === "trigger" ? <TriggerConfig /> : <NodeConfig node={node} />}
    </div>
  )
}

export default Inspector

const TriggerConfig: React.FC = () => {
  return (
    <>
      <FieldSelect
        label="Module"
        defaultValue="twitch"
        options={MODULE_OPTIONS}
      />

      <FieldSelect
        label="Event"
        defaultValue="follow"
        help="Fires once per new follower. Twitch dedupes within 24h."
        options={[
          { value: "follow", label: "Channel · Follow" },
          { value: "subscribe", label: "Channel · Subscribe" },
          { value: "cheer", label: "Channel · Cheer" },
          { value: "raid", label: "Channel · Raid" },
          { value: "chat", label: "Chat · Message" },
        ]}
      />

      <FieldInput label="Channel" prefix="@" mono defaultValue="yourname" />

      <FieldInput label="Debounce" suffix="ms" mono defaultValue="500" />

      <div className={styles.outputs}>
        <div className={styles.outputsHead}>
          <Typography role="label" size="small" className={styles.count}>
            Outputs · 4
          </Typography>
          <Typography role="code" size="small" className={styles.count}>
            {"{trigger.…}"}
          </Typography>
        </div>

        <StatusList
          copyable
          items={[
            { key: "{trigger.user.name}", value: "string" },
            { key: "{trigger.user.id}", value: "string" },
            { key: "{trigger.user.created}", value: "date" },
            { key: "{trigger.timestamp}", value: "date" },
          ]}
        />

        <Typography
          as="p"
          role="body"
          size="small"
          className={styles.outputsHelp}
        >
          Use these tokens inside Conditions and Actions. Click to copy.
        </Typography>
      </div>

      <Button variant="text" size="xsmall" tone="danger">
        Delete trigger
      </Button>
    </>
  )
}

const NodeConfig: React.FC<{ node: Node }> = ({ node }) => {
  const noun = node.kind === "condition" ? "condition" : "action"

  return (
    <>
      <FieldSelect
        label="Module"
        defaultValue={node.module.toLowerCase()}
        options={MODULE_OPTIONS}
      />

      <FieldInput label="Label" defaultValue={node.title} />

      {node.meta && (
        <FieldInput
          label="Expression"
          mono
          defaultValue={node.meta}
          help={`This ${noun} runs as part of the chain above.`}
        />
      )}

      <Button variant="text" size="xsmall" tone="danger">
        Delete {noun}
      </Button>
    </>
  )
}
