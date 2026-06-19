import { prisma } from "@/lib/prisma"


export async function GET(req: Request, { params }: { params: Promise<{ workflowid: string }> }) {
	const { workflowid } = await params

	try {
		const workflow = await prisma.workflows.findUnique({
			where: {
				id: Number(workflowid),
			}
		})

		if (!workflow) throw new Error("Workflow not found")

		const currVersion = await prisma.versions.findFirst({
			where: {
				workflowid: workflow.id,
				id: workflow.currVersion
			}
		})

		const rawVersionsList = await prisma.versions.findMany({
			where: {
				workflowid: workflow.id,
			},
			select: {
				id: true,
				versionNum: true,
			},
			orderBy: {
				versionNum: "asc"
			}

		})

		if (!rawVersionsList || !currVersion) throw new Error("Version not found")



		return Response.json({ workflow: workflow, currVersion: currVersion, versionsList: rawVersionsList })
	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error.message })

	}
}
