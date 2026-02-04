import {
  type Node,
  type NodeChange,
  type NodePositionChange,
  useReactFlow,
} from "@xyflow/react"
import { forwardRef, useCallback, useRef } from "react"

const Guides = forwardRef<HTMLCanvasElement | null>(
  function Guides(props, ref) {
    return <canvas ref={ref} className="os-flow__guides" />
  },
)

export default Guides

export function useGuides(): [
  React.RefObject<HTMLCanvasElement | null>,
  (changes: Array<NodeChange<Node>>) => void,
] {
  const { flowToScreenPosition, getNodes } = useReactFlow()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const update = useCallback(
    (
      change: NodePositionChange | undefined,
    ): {
      x?: number
      y?: number
    } => {
      const canvas = canvasRef.current
      const context = canvas?.getContext("2d")
      if (!canvas || !context) return {}

      const ratio = window.devicePixelRatio
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = width * ratio
      canvas.height = height * ratio
      context.scale(ratio, ratio)
      context.strokeStyle = "#0041d0"
      context.clearRect(0, 0, width, height)

      if (!change) return {}

      const nodes = getNodes()
      const { horizontal, vertical, snapPosition } = calculateGuides(
        change,
        nodes,
      )

      const coords = flowToScreenPosition({
        x: vertical ?? 0,
        y: horizontal ?? 0,
      })

      if (typeof vertical == "number") {
        context.moveTo(coords.x, 0)
        context.lineTo(coords.x, height)
        context.stroke()
      }

      if (typeof horizontal == "number") {
        context.moveTo(0, coords.y)
        context.lineTo(width, coords.y)
        context.stroke()
      }

      return snapPosition
    },
    [getNodes, flowToScreenPosition],
  )

  const handle = useCallback(
    (changes: Array<NodeChange<Node>>) => {
      update(undefined)

      if (changes.length === 1) {
        const change = changes[0]
        if (change.type === "position" && change.dragging && change.position) {
          const snap = update(change)

          change.position.x = snap.x ?? change.position.x
          change.position.y = snap.y ?? change.position.y
        }
      }
    },
    [update],
  )

  return [canvasRef, handle]
}

function calculateGuides(
  change: NodePositionChange,
  nodes: Node[],
  distance: number = 5,
) {
  const guides = {
    horizontal: undefined as number | undefined,
    vertical: undefined as number | undefined,
    snapPosition: {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
    },
  }

  const selected = nodes.find((p) => p.id === change.id)
  if (!selected || !change.position) return guides

  const selectedBounds = {
    left: change.position.x,
    right: change.position.x + (selected.measured?.width ?? 0),
    top: change.position.y,
    bottom: change.position.y + (selected.measured?.height ?? 0),
    width: selected.measured?.width ?? 0,
    height: selected.measured?.height ?? 0,
  }

  let distanceVertical = distance
  let distanceHorizontal = distance

  return nodes
    .filter((node) => node.id !== selected.id)
    .reduce((guides, node) => {
      const bounds = {
        left: node.position.x,
        right: node.position.x + (node.measured?.width ?? 0),
        top: node.position.y,
        bottom: node.position.y + (node.measured?.height ?? 0),
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      }

      const deltaLeftLeft = Math.abs(selectedBounds.left - bounds.left)
      if (deltaLeftLeft < distanceHorizontal) {
        guides.snapPosition.x = bounds.left
        guides.vertical = bounds.left
        distanceHorizontal = deltaLeftLeft
      }

      const deltaRightRight = Math.abs(selectedBounds.right - bounds.right)
      if (deltaRightRight < distanceHorizontal) {
        guides.snapPosition.x = bounds.right - selectedBounds.width
        guides.vertical = bounds.right
        distanceHorizontal = deltaRightRight
      }

      const deltaLeftRight = Math.abs(selectedBounds.left - bounds.right)
      if (deltaLeftRight < distanceHorizontal) {
        guides.snapPosition.x = bounds.right
        guides.vertical = bounds.right
        distanceHorizontal = deltaLeftRight
      }

      const deltaRightLeft = Math.abs(selectedBounds.right - bounds.left)
      if (deltaRightLeft < distanceHorizontal) {
        guides.snapPosition.x = bounds.left - selectedBounds.width
        guides.vertical = bounds.left
        distanceHorizontal = deltaRightLeft
      }

      const deltaTopTop = Math.abs(selectedBounds.top - bounds.top)
      if (deltaTopTop < distanceVertical) {
        guides.snapPosition.y = bounds.top
        guides.horizontal = bounds.top
        distanceVertical = deltaTopTop
      }

      const deltaBottomTop = Math.abs(selectedBounds.bottom - bounds.top)
      if (deltaBottomTop < distanceVertical) {
        guides.snapPosition.y = bounds.top - selectedBounds.height
        guides.horizontal = bounds.top
        distanceVertical = deltaBottomTop
      }

      const deltaBottomBottom = Math.abs(selectedBounds.bottom - bounds.bottom)
      if (deltaBottomBottom < distanceVertical) {
        guides.snapPosition.y = bounds.bottom - selectedBounds.height
        guides.horizontal = bounds.bottom
        distanceVertical = deltaBottomBottom
      }

      const deltaTopBottom = Math.abs(selectedBounds.top - bounds.bottom)
      if (deltaTopBottom < distanceVertical) {
        guides.snapPosition.y = bounds.bottom
        guides.horizontal = bounds.bottom
        distanceVertical = deltaTopBottom
      }

      return guides
    }, guides)
}
