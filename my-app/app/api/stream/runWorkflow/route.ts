import { QueueEvents } from "bullmq"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export function GET(req: NextRequest) {


	const searchParams = req.nextUrl.searchParams

	const targetJobId = searchParams.get("jobId")

	if (!targetJobId) throw new Error("Job ID not found")


	const queueEvents = new QueueEvents("executionQueue")
	const encoder = new TextEncoder()

	const stream = new ReadableStream({
		async start(controller) {

			const sendSSE = (event: string, data: any) => {
				const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
				controller.enqueue(encoder.encode(payload));
			};

			const handleProgress = ({ jobId, data }: { jobId: string, data: any }) => {
				if (jobId === targetJobId) {
					sendSSE('progress', { progress: data });
				}
			};

			const handleCompleted = ({ jobId, returnvalue }: { jobId: string, returnvalue: any }) => {
				if (jobId === targetJobId) {
					sendSSE('completed', { result: returnvalue });
					cleanup();
				}
			};

			// 5. Listen for failures
			const handleFailed = ({ jobId, failedReason }: { jobId: string, failedReason: any }) => {
				if (jobId === targetJobId) {
					sendSSE('failed', { error: failedReason });
					cleanup();
				}
			};

			queueEvents.on('progress', handleProgress);
			queueEvents.on('completed', handleCompleted);
			queueEvents.on('failed', handleFailed);

			const cleanup = async () => {
				queueEvents.off('progress', handleProgress);
				queueEvents.off('completed', handleCompleted);
				queueEvents.off('failed', handleFailed);
				await queueEvents.close(); 
				controller.close();
			};

			req.signal.addEventListener('abort', () => {
				cleanup();
			});
		}
	})
	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache, no-transform',
			'Connection': 'keep-alive',
		},
	});
}
