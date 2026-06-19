import { Worker } from "bullmq"
import { executeWorkflow } from "./main/WorkflowExecutor"
import { nodeExecutor } from "./main/NodeExecutor"
import { Node } from "@xyflow/react"
import { prisma } from "@/lib/prisma"
const worker = new Worker('executionQueue', async (job) => {
	const { versionId, workflow, node, executionId }: { versionId: string, workflow: boolean, node: Node, executionId: number } = job.data

	if (workflow) {
		const res = await executeWorkflow(Number(versionId), job)
	} else {
		console.log("Exectuting Node")
		const execution = await prisma.executions.findUnique({
			where: {
				id: executionId,
			},
		})
		const nodeData = await prisma.nodeExecutionData.findFirst({
			where: {
				executionid: executionId,
				nodeid: node.id
			}
		})
		if (!execution) return

		console.log("Following")
		const outputsObj = (execution.outputs ?? {}) as Record<string, any>

		const outputs = new Map<string, any>(
			Object.entries(outputsObj)
		)
		const inputObj = node.data.input ?? (nodeData?.input ?? {}) as Record<string, any>
		const input = new Map<string, any>(
			Object.entries(inputObj)
		)
		const res = await nodeExecutor(node, outputs, executionId, job, input)
	}

	return
},
	{
		connection: {
			host: "127.0.0.1",
			port: 6379
		}
	}
)

worker.on('completed', job => {
	console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
	console.log(`Job ${job?.id} failed`, err);
});

console.log('Worker started');


