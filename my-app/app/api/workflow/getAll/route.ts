import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ email: string }> }) {
	try {
		const email = await params
		const user = await prisma.users.findFirst({
			where: {
				email: String(email),
			}
		})
		if (!user) throw new Error("User with this email not found")

		const workflows = await prisma.workflows.findMany({
			where:{
				ownerid: user.id,
			}
		})

		return Response.json({workflows: workflows})

	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error })
	}
}
