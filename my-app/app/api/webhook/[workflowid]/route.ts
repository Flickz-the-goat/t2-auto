import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { Node } from "@xyflow/react"

export async function POST(req: Request, { params }: { params: Promise<{ workflowid: string }> }) {
	try {
		const data = await req.json()
		const { workflowid } = await params
		const workflow = await prisma.workflows.findUnique({
			where: {
				id: Number(workflowid)
			}
		})
		if (!workflow || !workflow.currVersion) throw new Error("Workflow not found")

		const version = await prisma.versions.findUnique({
			where: {
				id: workflow.currVersion
			}
		})

		if (!version) throw new Error("Workflow verison not found")
		const nodes = version.nodes as unknown as Node[]

		const updatedNodes = nodes.map((n) => {
			if (n.id == "webhookTrigger-0") {
				return {
					...n,
					data: {
						...n.data,
						input: data
					}
				}
			}
			return n
		})


		const updatedVersion = await prisma.versions.update({
			where: {
				id: version.id
			},
			data: {
				nodes: updatedNodes as unknown as Prisma.JsonArray
			}
		})
		if (!updatedVersion) throw new Error("Error updating node")
		console.log(data)

		const res = await fetch(`${process.env.BASE_URL}/api/workflow/execute/${workflow.currVersion}`)
		return Response.json({ status: "started", message: "started workflow" })
	}

	catch (e) {
		const err = e as Error
		return Response.json({ status: "failed", message: err.message })
	}
}
