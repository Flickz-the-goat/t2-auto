import { NodeExecutorType, nodeHandlers } from "../types";
import { NodeType } from "@/app/[email]/dashboard/[workflowId]/my-components/nodes/type";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export const nodeExecutor: NodeExecutorType = async (node, outputs, executionId, job, inputs?) => {
	try {
		//handle any vars in config 
		const handler = nodeHandlers[node.type!]
		const nData = node.data as NodeType
		nData.input = inputs ?? null
		if (!handler) {
			job.updateProgress({
				nodeid: node.id,
				status: "success"
			})
			return {
				status: "Success",
				message: "No handler is created for this node"
			}
		}

		const output = await handler(nData)
		outputs.set(node.id, output)

		let nodeData = await prisma.nodeExecutionData.findFirst({
			where: {
				executionid: executionId,
				nodeid: node.id
			},
		})

		if (!nodeData) {
			nodeData = await prisma.nodeExecutionData.create({
				data: {
					executionid: executionId,
					nodeid: node.id

				}
			})

		}

		if (!nodeData) throw new Error(`Unexpected Error with Node [${node.id}]`)

		nodeData = await prisma.nodeExecutionData.update({
			where: {
				id: nodeData.id,
			},
			data: {
				status: output.status,
				message: output.errorMessage ?? "Success Completed",
				output: output.output as Prisma.InputJsonValue,
				input: (nData.input instanceof Map
					? Object.fromEntries(nData.input)
					: nData.input) as Prisma.InputJsonValue,
			}
		})
		console.log("Updated Inputs", nodeData.input)


		if (output.status == "Failed") {
			job.updateProgress({
				nodeid: node.id,
				status: "error"
			})
			throw new Error(`Node [${node.id}] failed to run,\n 
							       Message: ${output.errorMessage}
							       `)
		}

		job.updateProgress({
			nodeid: node.id,
			status: "success"
		})
		return {
			status: "Success",
			message: `Node [${node.id}] - successfully executed`
		}
	}
	catch (e) {
		const err = e as Error
		return {
			status: "Failed",
			message: err.message
		}
	}
}
