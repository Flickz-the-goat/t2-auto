import { NodeType } from "../type";
import { type Node } from "@xyflow/react";

export interface webhookNodeType extends NodeType {
	config: {
		endpoint: string | null,
	}
}

export type webhookNode = Node<webhookNodeType, "webhookTrigger">
