"use client"
import { useParams, useSearchParams } from "next/navigation"
import ExecutionsNavbar from "./my-components/ExecutionsNavbar"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { VersionList } from "../../[workflowId]/page"
import ExecutionsSiderbar from "./my-components/ExecutionsSidebar"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { type Executions } from "@/generated/prisma/client"
import ExecutionDetails from "./my-components/ExecutionDetails"

export default function Executions() {

	const [loading, setLoading] = useState(false)
	const [versionsList, setVersionsList] = useState<VersionList[]>([])
	const [currVersionId, setCurrVersionId] = useState<number>()
	const [currVersionNum, setCurrVersionNum] = useState<string>()
	const [loadedVersionId, setLoadedVersionId] = useState<number>()
	const [loadedVersionName, setLoadedVersionName] = useState<string>()
	const [selectedExecution, setSelectedExecution] = useState<Executions | undefined>(undefined)



	const params = useParams<{ workflowid: string }>()
	const searchParams = useSearchParams()
	const loadedVersion = searchParams.get("loadedVersionId")
	const loadedVersionN = searchParams.get("loadedVersionName")
	const { setOpen } = useSidebar()

	const getWorkflow = async () => {
		setLoading(true)
		const res = await fetch(`/api/workflow/getOne/${params.workflowid}`)

		if (!res.ok) return

		const { workflow, currVersion, versionsList } = await res.json()

		setVersionsList(versionsList)
		setCurrVersionId(currVersion.id)
		setCurrVersionNum(currVersion.versionNum)
		if (loadedVersion && loadedVersionN) {
			setLoadedVersionId(Number(loadedVersion))
			setLoadedVersionName(loadedVersionN)
		}

		setLoading(false)
	}
	useEffect(() => {
		getWorkflow()

	}, [])

	if (loading) {
		return (
			<div className="h-screen w-screen flex flex-col items-center justify-center">
				<Spinner />
				<p>Loading your workflow in...</p>
			</div>
		)
	}

	return (
		<div className="h-full w-full">
			<ExecutionsSiderbar
				versionsList={versionsList}
				currVersionId={currVersionId!}
				currVersionNum={currVersionNum!}
				loadedVersionId={loadedVersionId!}
				loadedVersionName={loadedVersionName!}
				setSelectedExecution={setSelectedExecution}
			/>
			<ExecutionsNavbar
				workflowId={params.workflowid}
			/>
			{
				selectedExecution ? (
					<ExecutionDetails
						selectedExecution={selectedExecution}
					/>
				) : (
					<div
						className="h-[90vh] w-screen flex justify-center items-center"
					>
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant={"icon"}>
									<Workflow />
								</EmptyMedia>
								<EmptyTitle>
									No Execution Selected
								</EmptyTitle>
								<EmptyDescription>
									Select an execution from the sidebar
								</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button
									size={"sm"}
									onClick={() => setOpen(true)}
								>
									Select Execution
								</Button>
							</EmptyContent>
						</Empty>
					</div>
				)

			}
		</div>
	)
}
