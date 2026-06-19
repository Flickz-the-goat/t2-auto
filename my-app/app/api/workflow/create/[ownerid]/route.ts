import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ ownerid: string }> }) {

	try {
		const { ownerid } = await params
		const email = ownerid
		if (!email) throw new Error("No email sent")


		const user = await prisma.users.findFirst({
			where: {
				email: String(email),
			}
		})
		if (!user) throw new Error("User with this email not found")

		const workflow = await prisma.workflows.create({
			data: {
				ownerid: user.id,
				active: true,
				currVersion: -1,
			}
		})

		const v1 = await prisma.versions.create({
			data: {
				workflowid: workflow.id,
				versionNum: 1,
			}
		})

		const updatedWorkflow = await prisma.workflows.update({
			where: {
				id: workflow.id
			},
			data: {
				currVersion: v1.id
			}
		})

		return Response.json({ workflowid: updatedWorkflow.id })
	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error.message })
	}

}
