import { DagExecutorType, NodeHandlerOutputType } from "../types";
import { nodeExecutor } from "./NodeExecutor";

export const dagExecutor: DagExecutorType = async (nodesMap, dag, parents, children, outputs, executionId, job) => {

	try {
		if (!dag || dag.length == 0) throw new Error("DAG has not been properly created")

		console.log("DAG", dag)
		for (let i in dag) {
			const currNode = nodesMap.get(dag[i])
			console.log("DAG Executing Node", currNode?.id)

			if (!currNode) throw new Error(`Node [${dag[i]}] does not exist`)

			const inputs = new Map<string, NodeHandlerOutputType>()
			parents.get(dag[i])?.map((parent) => {
				inputs.set(parent, outputs.get(parent)!)
			})

			console.log("Node Inputs: ", inputs)

			const res = await nodeExecutor(currNode, outputs, executionId, job, inputs)

			console.log("Node Executed", dag[i], "Status", res.status)

			if (res.status == "Failed") throw new Error(res.message)

		}

		job.updateProgress({
			executionId: executionId
		})
		return {
			status: "Success",
			message: "DAG Successfully Executed"
		}

	}
	catch (e) {
		const err = e as Error
		console.log(err)
		job.updateProgress({
			executionId: executionId
		})
		return {
			status: "Failed",
			message: err.message
		}
	}
}
