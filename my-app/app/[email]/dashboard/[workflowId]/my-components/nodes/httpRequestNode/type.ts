import { Node } from "@xyflow/react"
import { NodeType } from "../type"

export interface HttpRequestNodeType extends NodeType {
	config: {
		method: string,
		endpoint: string,
	}
}

export type httpRequestNode = Node<HttpRequestNodeType, "httpRequest">


