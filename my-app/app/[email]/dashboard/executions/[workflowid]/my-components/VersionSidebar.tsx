"use client"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar"
import { VersionList } from "../../../[workflowId]/page"
import SidebarItem from "./SidebarItem"
import { useState } from "react"
import { ItemGroup } from "@/components/ui/item"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface Props {
	versionList: VersionList[],
	currVersionId: number,
	loadedVersionId: number,
	currVersionName: string,
	loadedVersionName: string,
	setSelectedVersion: any
}
export default function VersionSidebar(
	{
		versionList,
		currVersionId,
		loadedVersionId,
		currVersionName,
		loadedVersionName,
		setSelectedVersion,
	}: Props
) {



	return (
		<>
			<SidebarHeader className="py-4">
			<h1 className="text-xl text-center font-bold">
					Workflow Versions
				</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						Quick Actions
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<ItemGroup className="gap-2">
							<SidebarItem
								title={`Version ${currVersionName}`}
								description="The current version"
								action={setSelectedVersion}
								current={true}
								id={currVersionId}
							/>
							{
								!(loadedVersionId == currVersionId) && (
									<SidebarItem
										title={`Version ${loadedVersionName}`}
										description="The loaded version"
										action={setSelectedVersion}
										loaded={true}
										id={loadedVersionId}
									/>
								)
							}

						</ItemGroup>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator className="mb-2" />
				<Collapsible className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								All Versions
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<ItemGroup className="gap-2">
									{
										versionList.map((v) => (
											<SidebarItem
												title={`Version ${v.versionNum}`}
												description=""
												action={setSelectedVersion}
												id={v.id}
												key={v.id}
											/>
										))
									}
								</ItemGroup>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarContent >
		</>
	)
}
