import { prisma } from "@/lib/prisma"
import { on } from "events"

export async function GET(req: Request, { params }: { params: Promise<{ workflowid: string }> }) {

	try {
		const { workflowid } = await params

		if (!workflowid) throw new Error("Workflow Id not found")

		const deletedWorkflow = await prisma.workflows.delete({
			where: {
				id: Number(workflowid)
			}
		})

		if (!deletedWorkflow) throw new Error("Workflow could not be deleted")

		return Response.json({ status: "Success", message: "Workflow successfully deleted" })
	}
	catch (e) {
		return Response.error()
	}

}
