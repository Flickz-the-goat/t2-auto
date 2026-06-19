import { queue } from "@/execution/core/queue"

export async function POST(req: Request) {
	const { node, executionId } = await req.json()

	const job = await queue.add(`Job-${node.id}`, {
		node: node,
		executionId: executionId,
		workflow: false,
		versionId: null,
	})

	return Response.json({job: job})
}
