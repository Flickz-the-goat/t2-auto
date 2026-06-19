import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
	try {
		const { executionid } = await req.json()
		const nodeData = await prisma.nodeExecutionData.findMany({
			where: {
				executionid: executionid
			}
		})
		console.log(nodeData)

		return Response.json({ nodeData: nodeData })

	}
	catch (e) {
		const error = e as Error
		return Response.json({ error: error.message })

	}

}
