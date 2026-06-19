import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

	try {
		const { id, ...updateData } = await req.json()


		const updatedWorkflow = await prisma.workflows.update({
			where: {
				id: id,
			},
			data: {
				...updateData
			}
		})


		if (!updatedWorkflow) throw new Error("Workflow could not be updated")

		return Response.json({ updatedWorkflow: updatedWorkflow })

	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error.message })
	}
}
