import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ versionId: string }> }) {

	try {
		const { versionId } = await params
		if (!versionId) throw new Error("Invalid Version Id")

		const newVersion = await prisma.versions.findFirst({
			where: {
				id: Number(versionId),
			}
		})

		if (!newVersion) throw new Error(`This version does not exist: Version[${versionId}]`)

		return Response.json({ newVersion: newVersion })
	}

	catch (e) {
		return Response.error()
	}
}
