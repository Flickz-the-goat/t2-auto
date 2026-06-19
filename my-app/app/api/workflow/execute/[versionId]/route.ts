import { queue } from "@/execution/core/queue"

export async function GET(req: Request, { params }: { params: Promise<{ versionId: string }> }) {

	try {
		console.log("Sending job")
		const { versionId } = await params
		const job = await queue.add(`Job-${versionId}`, {
			versionId: versionId,
			workflow: true,
			node: null,
			executionId: null,
		})

		if (!job) throw new Error('Could not start job')

		console.log("Added job to queue")

		return Response.json({ job: job })
	}
	catch (e) {
		return Response.error()
	}


}
