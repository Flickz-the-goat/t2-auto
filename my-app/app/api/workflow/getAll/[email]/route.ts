import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ email: string }> }) {
	try {
		console.log("I RUNNN")
		const { email } = await params
		if (!email) throw new Error("EMAIL NOT FOUND")
		const user = await prisma.users.findFirst({
			where: {
				email: String(email),
			}
		})
		console.log("GOT THIS GUY", user, email)
		if (!user) throw new Error("User with this email not found")

		const workflows = await prisma.workflows.findMany({
			where: {
				ownerid: user.id,
			}
		})
		console.log("GOT WORKFLOWS", workflows)

		if (!workflows) throw new Error("workflows not found")

		return Response.json({ workflows: workflows })

	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error })
	}
}
