'use client'
import { Sidebar, useSidebar } from "@/components/ui/sidebar"
import VersionSidebar from "./VersionSidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { VersionList } from "../../../[workflowId]/page";
import { useState } from "react";
import SpecificVersionSidebar from "./SpecificVersionSidebar";

interface Props {
	versionsList: VersionList[],
	currVersionId: number,
	currVersionNum: string,
	loadedVersionId: number,
	loadedVersionName: string,
	setSelectedExecution: any
}
export default function ExecutionsSiderbar(
	{
		versionsList,
		currVersionId,
		currVersionNum,
		loadedVersionId,
		loadedVersionName,
		setSelectedExecution
	}: Props
) {
	const { open, setOpen } = useSidebar()
	const [selectedVersion, setSelectedVersion] = useState<number | undefined>(undefined)

	return (
		<Sidebar
			style={
				{
					"--sidebar-width": "24rem",
				} as React.CSSProperties
			}
		>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className={`
		absolute top-6 z-50 transition-all duration-300
		${open ? "right-3" : "-right-8"}
	`} onClick={() => setOpen(!open)}>
							{
								open ? <PanelLeftClose className="w-6 h-6 stroke-zinc-400" /> : <PanelLeftOpen className="w-6 h-6 stroke-zinc-300" />
							}

						</div>
					</TooltipTrigger>
					<TooltipContent
						className={`
							absolute top-5 z-50 transition-all duration-300
							${open ? "-right-30 w-32" : "left-8 w-26"}
						`}
						side="right"
					>
						{
							open ? (
								"Collapse Sidebar"
							) : (
								"Open Sidebar"
							)
						}
					</TooltipContent>
				</Tooltip>

			</TooltipProvider>
			{
				selectedVersion ? (
					<SpecificVersionSidebar
						selectedVersion={selectedVersion}
						setSelectedVersion={setSelectedVersion}
						setSelectedExecution={setSelectedExecution}
					/>
				) : (
					<VersionSidebar
						versionList={versionsList}
						currVersionId={currVersionId!}
						loadedVersionId={loadedVersionId!}
						currVersionName={currVersionNum!}
						loadedVersionName={loadedVersionName}
						setSelectedVersion={setSelectedVersion}
					/>
				)
			}
		</Sidebar>


	)
}
