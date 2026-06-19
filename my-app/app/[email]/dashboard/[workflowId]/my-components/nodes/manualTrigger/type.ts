
import { Node } from "@xyflow/react"
import { NodeType } from "../type"

export interface ManualTriggerType extends NodeType {
	config: null
}

export type manualTrigger = Node<ManualTriggerType, "manualTrigger">


