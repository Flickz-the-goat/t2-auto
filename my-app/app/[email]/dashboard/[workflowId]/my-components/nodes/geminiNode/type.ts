import { Node } from "@xyflow/react"
import { NodeType } from "../type"

export interface geminiNodeType extends NodeType {
	config: {
		apiKey: string,
		type: "chat" | "image",
		userPrompt: string,
		systemPrompt?: string,
		responseType?: string,
		responseJsonSchema?: string,
		numImages?: number
	}
}

export type geminiNode = Node<geminiNodeType, "geminiNode">
