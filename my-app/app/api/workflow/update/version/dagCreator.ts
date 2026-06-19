import { Node, Edge } from "@xyflow/react";

export interface CreateDagReturnType {
	parents: Map<string, string[]>, // id: nodeid, val: node's parents
	children: Map<string, string[]>, // id: nodeid, val: nodes children
	dag: string[],
	valid: boolean,
}
interface createParentsChildrenReturnType {
	parents: Map<string, string[]>,
	children: Map<string, string[]>,

}
export function createDag(nodes: Node[], edges: Edge[]): CreateDagReturnType {
	const nodeids = nodes.map((n) => n.id)
	const { parents, children } = createParentsChildren(edges)
	const dag: string[] = []
	let valid = false
	try {
		const firstNodeId = findFirstNode(parents, children)

		const queue: string[] = [firstNodeId]

		while (queue.length) {
			const n = queue.shift()!
			const p: string[] = parents.get(n)!
			const c: string[] = children.get(n)!


			for (let i in p) {
				if (!(p[i] in dag)) continue
			}

			dag.push(n)
			c?.forEach((child) => {
				queue.push(child)
			})
		}

		if (dag.length == nodes.length) {
			valid = true
		}

		console.log("Finished Parents and Children", parents, children)
		return {
			parents, children, dag, valid
		}
	}

	catch (e) {
		console.log("Error in createDag", e)
		return {
			parents, children, dag, valid
		}
	}

}

function findFirstNode(parents: Map<string, string[]>, children: Map<string, string[]>): string {
	try {
		for (const [id, _] of children) {
			if (!(id in parents.keys())) return id
		}
		return ""
	}
	catch (e) {
		console.log("Error finding first node", e)
		return ""
	}
}

function createParentsChildren(edges: Edge[]): createParentsChildrenReturnType {
	const parents = new Map<string, string[]>()
	const children = new Map<string, string[]>()

	try {
		edges.map((e) => {
			const p = e.source
			const c = e.target

			if (!children.get(p)) children.set(p, [])
			if (!parents.get(c)) parents.set(c, [])

			children.get(p)!.push(c)
			parents.get(c)!.push(p)
		})
		return { parents, children }
	}
	catch (e) {
		console.log("Parents not created properly", e)
		return { parents, children }
	}
}
