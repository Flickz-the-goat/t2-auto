import { prisma } from "@/lib/prisma"
import { createDag } from "./dagCreator"

interface data {
	nodes: any,
	edges: any,
	parents?: any,
	children?: any,
	dag?: any
	valid?: boolean,
}

export async function POST(req: Request) {
	try {
		const { id, nodes, edges, dag } = await req.json()

		let updateData: data = { nodes: nodes, edges: edges }


		if (dag) {
			const { parents, children, dag, valid } = createDag(nodes, edges)

			updateData = {
				...updateData,
				parents: Object.fromEntries(parents),
				children: Object.fromEntries(children),
				dag: dag,
				valid: valid
			}
		}
		const updatedVersion = await prisma.versions.update({
			where: {
				id: id,
			},
			data: {
				...updateData
			}
		})
		console.log("Updated Version", updatedVersion)

		if (!updatedVersion) throw new Error("Version could not be updated")

		return Response.json({ updatedVersion: updatedVersion })
	}
	catch (e) {
		console.log(e)
		return Response.error()
	}
}
