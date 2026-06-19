"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Panel } from "@xyflow/react";
import { ALargeSmall, ArrowUpCircle, Check, CircleDot, Folder, Plus, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useNodeContext } from "./nodes/NodeContext";
import { Spinner } from "@/components/ui/spinner";
import RunWorkflow from "./RunWorkflow";
import { VersionList } from "../page";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "sonner";

interface Props {
	name: string,
	currVersion: number,
	versionsList: VersionList[] | undefined,
	updateWorkflow: (values: any, refetch: boolean) => void,
	loadedVersion: number,
	loadedVersionName: string,
	onVersionChange: (versionId: number) => void,
	createNewVersion: () => void,
	workflowId: number,
}
export default function FlowNavbar({ name,
	currVersion,
	versionsList,
	updateWorkflow,
	loadedVersion,
	loadedVersionName,
	createNewVersion,
	workflowId,
	onVersionChange }: Props) {


	const [workflowName, setWorkflowName] = useState(name)
	const [loading, setLoading] = useState(false)
	const { user, isLoading, error } = useUser()
	const { updateVersion } = useNodeContext()
	const update = async () => {
		setLoading(true)
		await updateVersion(true)
		toast.success(`Updated version ${loadedVersionName}`, { position: "top-center" })
		setLoading(false)
	}

	if (!user) return <div></div>

	return (
		<Panel position="top-center" className="w-full bg-transparent! z-50">
			<div className="sticky top-0 z-50 p-4 ">
				<nav>
					<div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 rounded-xl border border-border bg-background/70 shadow-sm">
						<div className="flex gap-4">
							<Link href={`/${user.email}/dashboard`}>
								<div className="flex items-center gap-2 hover:brightness-75">
									<ALargeSmall className="w-7 h-7 text-foreground" />
								</div>
							</Link>
							<Field orientation={"horizontal"}>
								<Input placeholder="Title" value={workflowName}
									onChange={(e) => {
										setWorkflowName(e.target.value)
									}}
									className="border-none bg-transparent font-bold w-50"
								/>
								<Button variant={"outline"} size={"icon-sm"}

									onClick={() => updateWorkflow({ name: workflowName }, false)
									}								>
									<Check />
								</Button>
							</Field>


							<Select
								value={String(loadedVersion)}
								onValueChange={(value) => onVersionChange(Number(value))}
							>
								<SelectTrigger className="w-fit">
									<SelectValue placeholder="Version" />
								</SelectTrigger>
								<SelectContent
									position="popper"
									className="max-h-45 overflow-y-scroll"
								>
									<SelectGroup>
										<SelectLabel>Versions</SelectLabel>
										{
											versionsList?.map((v) => (
												<SelectItem value={String(v.id)} key={`id-${v.id}`}>
													<span
														className="hidden lg:inline"
													>Version </span>{v.versionNum}
												</SelectItem>
											))
										}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="flex gap-4">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>

										<Link
											href={`/${user.email}}/dashboard/executions/${workflowId}?loadedVersionId=${loadedVersion}&loadedVersionName=${loadedVersionName}`}
										>
											<Button variant={"outline"} size={"icon-sm"}>
												<Folder />
											</Button>
										</Link>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										Workflow History
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant={"outline"} size={"icon-sm"}
											onClick={() => update()}
											disabled={loading}
										>
											{
												loading ? (<Spinner />) : (<Save />)
											}
										</Button>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										Save Workflow
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>

										<Button variant={"outline"} size={"icon-sm"} onClick={() => createNewVersion()}>
											<Plus />
										</Button>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										Create new version
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<RunWorkflow />

							{
								currVersion === loadedVersion ? (
									<div className="flex items-center justify-center">
										<Badge className="
										bg-emerald-600/50
										border-emerald-500
										text-foreground
										"
										>
											Current Version
											<CircleDot className="h-16 w-16 animate-pulse stroke-emerald-500 stroke-4" />
										</Badge>
									</div>
								) : (
									<>
										<Button variant={"secondary"} size={"sm"}
											onClick={() => {
												updateWorkflow({
													currVersion: loadedVersion
												}, false)
											}}
										>
											Set as Current Version
										</Button>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>

													<Button variant={"outline"}
														onClick={() => onVersionChange(currVersion)}
													>
														<ArrowUpCircle className="-rotate-90" />
													</Button>
												</TooltipTrigger>
												<TooltipContent side="bottom"
												>
													Return to current Version
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>

									</>
								)

							}

						</div>
					</div>
				</nav >
			</div >
		</Panel >
	)
}
