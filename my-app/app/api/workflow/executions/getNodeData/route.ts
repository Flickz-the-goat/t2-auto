import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
	try {
		const { executionid, nodeid } = await req.json()

		console.log(executionid, nodeid)

		const nodeData = await prisma.nodeExecutionData.findFirst({
			where: {
				nodeid: nodeid,
				executionid: Number(executionid),
			}
		})

		console.log(nodeData)
		return Response.json({nodeData: nodeData})
	}
	catch (e) {
		return Response.error()
	}

}
