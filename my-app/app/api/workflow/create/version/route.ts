import { Prisma, Versions } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
	try {
		const { version }: { version: Versions } = await req.json()

		const currVersionsList = await prisma.versions.findMany({
			where: {
				workflowid: version.workflowid,
			},
			select: {
				id: true,
			}
		})

		const currLen = currVersionsList.length

		const newVersion = await prisma.versions.create({
			data: {
				workflowid: version.workflowid,
				nodes: version.nodes as Prisma.InputJsonValue,
				edges: version.edges as Prisma.InputJsonValue,
				versionNum: currLen + 1,
			}
		})

		console.log(newVersion)

		if (!newVersion) throw new Error("New Version could not be created")

		const rawVersionsList = await prisma.versions.findMany({
			where: {
				workflowid: version.workflowid,
			},
			select: {
				id: true,
				versionNum: true,
			},
			orderBy: {
				versionNum: "asc"
			}
		})

		if (!rawVersionsList) throw new Error("Version List not found")




		return Response.json({ newVersion: newVersion, versionsList: rawVersionsList })


	}
	catch (e) {
		return Response.error()
	}
}
