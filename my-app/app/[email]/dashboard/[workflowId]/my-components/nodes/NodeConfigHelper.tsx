import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Node, useReactFlow } from "@xyflow/react";
import { PlayIcon, Save } from "lucide-react";
import { useNodeContext } from "./NodeContext";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { BaseNodeType } from "./type";
import { toast } from "sonner";

export default function NodeConfigHelper({ node, data, input, output, getNodeData }: { node: Node, data: any, input: any, output: any, getNodeData: any }) {
	const { updateVersion, loadedVersion } = useNodeContext()
	const { setNodes } = useReactFlow<BaseNodeType>()
	const [loading, setLoading] = useState(false)

	const updateNode = async () => {
		setLoading(true)
		setNodes((nodes) => (
			nodes.map((n) => {
				if (node.id == n.id) {
					return {
						...n,
						data: {
							...data,
							input: input,
							output: output,
							config: data.config
						}
					}
				}
				return n
			})
		))

		await updateVersion()
		toast.success("Node Updated")
		setLoading(false)
	}


	const runNode = async () => {
		setLoading(true)
		const res = await fetch(`/api/workflow/execute/executeNode`, {
			method: 'POST',
			headers: { "Context-Type": "application/json" },
			body: JSON.stringify({ node: node, executionId: loadedVersion?.currExecution })
		})

		if (!res.ok) return

		const { job } = await res.json()
		setLoading(false)

		const eventSrc = new EventSource(`/api/stream/runWorkflow?jobId=${job.id}`)

		eventSrc.addEventListener("completed", async (event) => {
			await getNodeData()
			eventSrc.close()
		})

		eventSrc.addEventListener("failed", async (event) => {
			await getNodeData()
			eventSrc.close()
		})
		toast.success("Node Execution Finished")

	}

	return (
		<Field
			orientation={"horizontal"}
			className="flex items-center justify-center mt-4"
		>
			<Button
				size={"sm"}
				className={`group`}
				disabled={loading}
				onClick={() => runNode()}
			>
				<PlayIcon className="group-hover:fill-secondary-foreground transition-colors" />

				Execute Node
			</Button>
			<Button
				variant={"secondary"}
				size={"sm"}
				onClick={() => updateNode()}
				disabled={loading}
			>
				{
					loading ? (<Spinner />) : (<Save />)

				}
				Save Data
			</Button>
		</Field>
	)
}
