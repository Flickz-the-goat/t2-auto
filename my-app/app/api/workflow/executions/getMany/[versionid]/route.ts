import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ versionid: string }> }) {

	try {
		const { versionid } = await params

		const version = await prisma.versions.findUnique({
			where: {
				id: Number(versionid)
			}
		})

		const executions = await prisma.executions.findMany({
			where: {
				versionid: Number(versionid)
			},
			orderBy: {
				updatedat: "desc"
			}
		})

		if (!executions) throw new Error("Executions not found")

		return Response.json({ executions: executions, currExecution: version?.currExecution })

	}
	catch (e) {
		const err = e as Error
		return Response.error()
	}
}
