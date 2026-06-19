"use client"
import { useEffect, useState } from "react"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Workflows } from "@/generated/prisma/client"
import Link from "next/link"
import { User } from "@auth0/nextjs-auth0/types"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FolderCode, MoreHorizontalIcon } from "lucide-react"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteMapEntry } from "next/dist/client/components/segment-cache/cache-map"
import { getWorkflow } from "../[workflowId]/lib/helpers"



interface Props {
	user: User,
	createWorkflow: () => void
}
export default function ItemsTable({ user, createWorkflow }: Props) {
	const [workflows, setWorkflows] = useState<Workflows[] | null>(null)
	const [loading, setLoading] = useState(false)
	const getWorkflows = async () => {
		setLoading(true)
		const res = await fetch(`/api/workflow/getAll/${user.email}`)
		if (!res.ok) { console.log(await res.json()); return }

		const { workflows } = await res.json()
		console.log("Workflows", workflows)

		setWorkflows(workflows ? workflows : null)
		setLoading(false)

	}
	useEffect(() => {

		getWorkflows()
	}, [user])


	const deleteWorkflow = async (workflowid: number) => {

		const res = await fetch(`/api/workflow/delete/${workflowid}`)

		if (!res.ok) {
			toast.error("Workflow could not be deleted")
			return
		}

		const { status, message } = await res.json()

		toast.success(message)
		getWorkflows()
	}

	if (loading) {
		return (
			<div className="h-96 flex flex-col gap-2 justify-center items-center text-muted-foreground">
				<Spinner className="h-8 w-8" />
				Fetching your workflows...
			</div>

		)
	}
	if (!workflows || !workflows.length) {
		return (
			<Empty className="h-96">
				<EmptyHeader>
					<EmptyMedia variant={"icon"}>
						<FolderCode />
					</EmptyMedia>
					<EmptyTitle>
						No workflows yet
					</EmptyTitle>
					<EmptyDescription>
						You haven&apos;t created any workflwos yet, Get started by creating your first workflow
					</EmptyDescription>
					<EmptyContent>
						<Button onClick={() => createWorkflow()}>
							Create Workflow
						</Button>
					</EmptyContent>

				</EmptyHeader>
			</Empty>
		)

	}
	return (
		<div className="border-border h-96 overflow-y-scroll">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead className="h-14 px-2 text-muted-foreground font-medium">
							Workflow
						</TableHead>

						<TableHead className="h-14 px-2 text-right text-muted-foreground font-medium">
							Status
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{workflows.map((workflow) => (

						<TableRow
							key={workflow.id}
							className="px-2 border-b border-border hover:bg-muted/20 transition-colors"
						>

							<TableCell className="py-5">
								<div className="flex items-center gap-4">

									<div>
										<p className="font-medium text-foreground">
											{workflow.name ? workflow.name : "Untitled"}
										</p>

										<p className="text-sm text-muted-foreground">
											Last edited 2 hours ago
										</p>
									</div>
								</div>
							</TableCell>

							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant={"ghost"} size={"icon"}>
											<MoreHorizontalIcon />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>

										<Link href={`dashboard/${workflow.id}`} className="">
											<DropdownMenuItem>
												Open
											</DropdownMenuItem>
										</Link>
										<DropdownMenuItem variant="destructive"
											onClick={() => deleteWorkflow(workflow.id)}
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>

						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
