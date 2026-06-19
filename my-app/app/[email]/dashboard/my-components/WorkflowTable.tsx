"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useUser } from "@auth0/nextjs-auth0"
import { Workflows } from "@/generated/prisma/client"
import Link from "next/link"
import ItemsTable from "./ItemsTable"

export default function WorkflowTable() {
	const workflowTest = [
		{
			id: 1,
			name: "Test Workflow",
			status: "Running",
		},
	]
	const [loading, setLoading] = useState(false)
	const { user, error } = useUser()


	if (error) return <div>Error: {error.message}</div>
	if (!user) return null


	const createWorkflow = async () => {

		setLoading(true)
		const res = await fetch(`/api/workflow/create/${user.email}`)

		if (!res.ok) { console.log(await res.json()); return }

		const { workflowid } = await res.json()
		setLoading(false)

		window.location.replace(`/${user.email}/dashboard/${workflowid}`)
	}

	return (
		<div className="w-full">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Your Workflows
					</h2>

					<p className="text-sm text-muted-foreground mt-1">
						Manage and monitor your automations
					</p>
				</div>

				<Button className="gap-2" onClick={() => createWorkflow()} disabled={loading}>
					{
						loading ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />
					}
					Create Workflow
				</Button>
			</div>
			<ItemsTable user={user} createWorkflow={createWorkflow}/>

	</div>

	)
}
