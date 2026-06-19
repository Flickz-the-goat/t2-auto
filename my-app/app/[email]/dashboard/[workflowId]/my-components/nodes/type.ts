import { Node } from "@xyflow/react"
import { sidebarNode } from "../Sidebar/ItemCard"
import { metadata } from "@/app/layout"


export interface NodeType {
	[key: string]: unknown,
	input: Map<string, unknown> | null,
	output: any | null,
	config: Record<string, unknown>,
	metadata: {
		status: string
		type: string
	}
}
export type BaseNodeType = Node<NodeType>

interface Props {
	getNodes: () => Node[],
	addNodes: any,
	setOpen: (open: boolean) => void,
	node: sidebarNode,
}

export const addNode = ({ getNodes, addNodes, setOpen, node}: Props) => {
	const num = getNodes().filter((n) => n.type! === node.type).length
	const id = `${node.type}-${num}`
	console.log("adding node", id)
	addNodes({
		id,
		position: { x: 0, y: 0 },
		data: {
			input: null,
			output: null,
			config: {},
			metadata: {
				status: "initial",
				type: node.type,
			}
		},
		type: node.type,
	})
	setOpen(false)
}

