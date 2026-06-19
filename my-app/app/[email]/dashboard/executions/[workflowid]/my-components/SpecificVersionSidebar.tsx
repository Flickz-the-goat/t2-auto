import { Executions } from "@/generated/prisma/client"
import { useEffect, useState } from "react"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarSeparator, useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { ItemGroup } from "@/components/ui/item"
import SidebarItem from "./SidebarItem"
import { Button } from "@/components/ui/button"

interface Props {
	selectedVersion: number,
	setSelectedVersion: any,
	setSelectedExecution: any,
}
export default function SpecificVersionSidebar(
	{
		selectedVersion,
		setSelectedVersion,
		setSelectedExecution,
	}: Props
) {

	const [executions, setExecutions] = useState<Executions[]>([])
	const [currExecution, setCurrExecution] = useState<number>()
	const { setOpen } = useSidebar()


	useEffect(() => {
		const getExecutions = async () => {
			const res = await fetch(`/api/workflow/executions/getMany/${selectedVersion}`)

			if (!res.ok) return

			const { executions, currExecution } = await res.json()


			setExecutions(executions)
			setCurrExecution(currExecution)
			console.log(executions)
		}
		getExecutions()
	}, [selectedVersion])
	if (!selectedVersion) return

	if (!executions || executions.length == 0) {
		return (
			<div>
				Executions Not Found
			</div>
		)
	}

	return (
		<>
			<SidebarHeader className="py-4">
				<div className="flex gap-4">
					<Button
						variant={"ghost"}
						onClick={() => setSelectedVersion(undefined)}
					>
						<ArrowLeft className="w-16 h-16" />
					</Button>
					<h1 className="text-xl text-center font-bold">
						{selectedVersion} Executions
					</h1>
				</div>

				<SidebarContent>

					<SidebarGroup>
						<SidebarGroupLabel>
							Quick Actions
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<ItemGroup>
								{
									executions.filter((e) => (
										e.id == currExecution
									)).map((e) => (
										<SidebarItem
											title={`Latest Successfull Execution ${e.updatedat ? new Date(e.updatedat).getDate() : e.id}`}
											description={e.message}
											action={setSelectedExecution}
											id={e}
											executions={true}
											status={e.status}
											key={e.id}
											current={true}
										/>

									))
								}
							</ItemGroup>
						</SidebarGroupContent>
					</SidebarGroup>

					<SidebarSeparator className="mb-2" />
					<Collapsible className="group/collapsible" defaultOpen>
						<SidebarGroup>
							<SidebarGroupLabel asChild>
								<CollapsibleTrigger>
									All Executions
									<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<ItemGroup className="gap-2">
										{
											executions.map((e) => (
												<SidebarItem
													title={`Execution ${e.updatedat ? new Date(e.updatedat).toDateString() : e.id}`}
													description={e.message}

													action={setSelectedExecution}
													id={e}
													executions={true}
													status={e.status}
													key={e.id}
												/>
											))
										}
									</ItemGroup>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>

				</SidebarContent>

			</SidebarHeader >
		</>
	)

}
