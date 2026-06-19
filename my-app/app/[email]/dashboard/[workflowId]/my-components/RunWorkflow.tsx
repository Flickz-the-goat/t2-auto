import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNodeContext } from "./nodes/NodeContext";
import { toast } from "sonner"
import { Job } from "bullmq";
import { Spinner } from "@/components/ui/spinner";
import { Play } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { BaseNodeType } from "./nodes/type";


export interface ProgressData {
	progress: {
		nodeid: string,
		status: string,
		executionId?: number
	}

}

export default function RunWorkflow() {

	const [loading, setLoading] = useState(false)

	const { loadedVersion, setLoadedVersion } = useNodeContext()
	const { setNodes } = useReactFlow<BaseNodeType>()

	const updateNode = (data: ProgressData) => {
		console.log(data.progress.nodeid)

		if (data.progress.executionId) {
			setLoadedVersion({
				...loadedVersion!,
				currExecution: data.progress.executionId
			})
		}
		if (data.progress.nodeid) {
			setNodes((nodes) => (
				nodes.map((n) => {
					if (n.id == data.progress.nodeid) {
						return {
							...n,
							data: {
								...n.data,
								metadata: {
									...n.data.metadata,
									status: data.progress.status
								}
							}
						}
					}
					return n
				}
				)))
		}
	}

	const runWorkflow = async () => {
		setLoading(true)
		if (!loadedVersion) {
			setLoading(false)
			return
		}
		console.log("Starting job for", loadedVersion.id)

		const res = await fetch(`/api/workflow/execute/${loadedVersion.id}`)

		if (!res.ok) {
			toast.error("Error starting job")
			return
		}

		const { job }: { job: Job } = await res.json()
		setLoading(false)
		toast.success(`Job has been created`, { position: "top-center" })

		const eventSrc = new EventSource(`/api/stream/runWorkflow?jobId=${job.id}`)

		eventSrc.addEventListener("progress", (event) => {
			const data: ProgressData = JSON.parse(event.data)
			updateNode(data)
		})

		eventSrc.addEventListener("completed", (event) => {
			toast.success("Workflow successfully completed")
			eventSrc.close()
		})

		eventSrc.addEventListener("failed", (event) => {
			toast.error("Workflow failed to fully execute")
			eventSrc.close()
		})
	}

	return (
		<Button size={"sm"}
			disabled={loading}
			onClick={() => runWorkflow()}
		>
			{
				loading ? <Spinner /> : <Play />
			}
			Run Workflow
		</Button>
	)
}
