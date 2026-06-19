import { prisma } from "@/lib/prisma";
import { ExecutionReturnType, NodeHandlerOutputType } from "../types";
import { Edge, Node } from "@xyflow/react";
import { dagExecutor } from "./DAGExecutor";
import { Job } from "bullmq";

export async function executeWorkflow(versionId: number, job: Job): Promise<ExecutionReturnType> {

	try {

		const version = await prisma.versions.findUnique({
			where: {
				id: Number(versionId)
			}
		})

		if (!version) throw new Error(`Version [${versionId}] was not found`)

		console.log("Initialzing base data structs")

		const nodes = version.nodes as unknown as Node[]
		const edges = version.edges as unknown as Edge[]
		const parents = new Map<string, string[]>(
			Object.entries(version.parents ?? {})
		)
		const children = new Map<string, string[]>(
			Object.entries(version.id ?? {})
		)
		const dag = version.dag as string[]
		const valid = version.valid

		if (!valid) throw new Error(`Workflow [${version.workflowid}] - Version [${version.versionNum}] is not a valid graph and cant be executed\n\n DAG: ${dag}\n\n nodes: ${JSON.stringify(nodes)}`)

		const nodesMap = createNodesMap(nodes)

		const outputs = new Map<string, NodeHandlerOutputType>()


		const execution = await prisma.executions.create({
			data: {
				versionid: version.id,
				status: "Started",
				message: "Working on your Workflow"
			}
		})
		if (!execution) throw new Error("Failed to create a new execution")


		const res = await dagExecutor(nodesMap, dag, parents, children, outputs, execution.id, job)

		console.log("DAG Executed with", res.status)
		if (res.status == "Failed") {
			await prisma.executions.update({
				where: {
					id: execution.id
				},
				data: {
					status: res.status,
					message: res.message
				}
			})
			return {
				status: "Failed",
				message: "Workflow failed to finish"
			}

		}

		const updatedExecution = await prisma.executions.update({
			where: {
				id: execution.id
			},
			data: {
				status: res.status,
				message: "Workflow successfully finished"
			}
		})

		const updatedVersion = await prisma.versions.update({
			where: {
				id: Number(versionId)
			},
			data: {
				currExecution: execution.id
			}
		})


		if (!updatedExecution) throw new Error('There was an error updating the execution')

		return {
			status: "Success",
			message: "Workflow successfully finished"
		}
	}
	catch (e) {
		const err = e as Error
		console.log(err)
		return {
			status: "Failed",
			message: err.message
		}
	}
}

function createNodesMap(nodes: Node[]): Map<string, Node> {
	const nodesMap = new Map<string, Node>()
	for (let i in nodes) {
		const n = nodes[i]
		nodesMap.set(n.id, n)
	}
	return nodesMap
}
