import { HandleGemini } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/geminiNode/handler"
import { HandleGmail } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/gmailNode/handler"
import { HttpNodeHandler } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/httpRequestNode/handler"
import { NodeType } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/type"
import { HandleWebhook } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/webhookNode/handler"
import { Node } from "@xyflow/react"
import { Job } from "bullmq"

export interface ExecutionReturnType {
	status: string,
	message: string
}

export interface NodeHandlerOutputType {
	status: string,
	output: any,
	errorMessage?: string
}


export type NodeHandlerType = (
	nodeData: NodeType,
) => Promise<NodeHandlerOutputType>

export type DagExecutorType = (
	nodesMap: Map<string, Node>,
	dag: string[],
	parents: Map<string, string[]>,
	children: Map<string, string[]>,
	outputs: Map<string, NodeHandlerOutputType>,
	executionId: number,
	job: Job
) => Promise<ExecutionReturnType>

export type NodeExecutorType = (
	node: Node,
	outputs: Map<string, NodeHandlerOutputType>,
	executionId: number,
	job: Job,
	inputs?: Map<string, NodeHandlerOutputType>,
) => Promise<ExecutionReturnType>

export const nodeHandlers: Record<string, NodeHandlerType | null> = {
	"httpRequest": HttpNodeHandler,
	"gmailNode": HandleGmail,
	"webhookTrigger": HandleWebhook,
	"geminiNode": HandleGemini,
}
