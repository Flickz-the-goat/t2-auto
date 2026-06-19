"use client"
import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import ManualTrigger from "./manualTrigger/ManualTrigger"
import { nodeRegistry } from "./NodeRegistry"
import { Node, useReactFlow } from "@xyflow/react"
import { Versions } from "@/generated/prisma/client"
import { VersionList } from "../../page"
import { BaseNodeType } from "./type"



export interface NodeConfigProps {
	node: BaseNodeType,
	setNode: any
}

interface NodeContextType {
	nodeTypes: Record<string, any>,
	nodeConfigs: Record<string, any>,
	loadedVersion: Versions | undefined,
	versionsList: VersionList[],
	workflowid: string,
	setWorkflowId: (id: string) => void,
	setVersionsList: (list: VersionList[]) => void,
	setLoadedVersion: (version: Versions) => void,
	addNodeType: (key: string) => void,
	addNodeConfig: (key: string) => void,
	updateVersion: () => void,
	initNodeTypes: (nodes: Node[]) => void,
}

const NodeContext = createContext<NodeContextType | null>(null);


export const NodeContextProvider = ({ children }: { children: ReactNode }) => {

	const [nodeTypes, setNodeTypes] = useState<Record<string, any>>({
		"manualTrigger": ManualTrigger,
	})
	const [nodeConfigs, setNodeConfigs] = useState<Record<string, any>>({
		"test": "test"
	})
	const [loadedVersion, setLoadedVersion] = useState<Versions>()
	const [versionsList, setVersionsList] = useState<VersionList[]>([]) // Array of version Ids 
	const [workflowid, setWorkflowId] = useState("")
	const { getNodes, getEdges } = useReactFlow()

	const initNodeTypes = (nodes: Node[]) => {
		if (!nodes) return

		nodes.map((n) => {
			addNodeType(n.type!)
			addNodeConfig(n.type!)
		})
	}

	const addNodeType = (key: string) => {
		if (nodeTypes[key]) return

		const registeredNode = nodeRegistry[key]
		if (!registeredNode) return

		setNodeTypes((prev) => ({
			...prev,
			[key]: registeredNode.nodeComponent
		}))
	}

	const addNodeConfig = (key: string) => {
		if (nodeConfigs[key]) return

		const registeredNode = nodeRegistry[key]
		if (!registeredNode) return

		setNodeConfigs((prev) => ({
			...prev,
			[key]: registeredNode.nodeConfig
		}))
	}

	const updateVersion = async (dag?: boolean) => {
		if (!loadedVersion) return

		const nodes = getNodes()
		const edges = getEdges()
		const res = await fetch(`/api/workflow/update/version`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: loadedVersion.id, nodes: nodes, edges: edges, dag: dag || false })
		})

		if (!res.ok) throw new Error("Unable to update version")

		const { updatedVersion } = await res.json()
		setLoadedVersion(updatedVersion as Versions)
	}

	/*
	const value = useMemo(() => ({
		nodeTypes,
		nodeConfigs,
		addNodeType,
		addNodeConfig,
		loadedVersionId,
		setLoadedVersionId
	}), [
		nodeTypes,
		nodeConfigs,
		addNodeType,
		addNodeConfig,
		loadedVersionId,
		setLoadedVersionId
	])
	*/
	const value = {
		nodeTypes,
		nodeConfigs,
		addNodeType,
		addNodeConfig,
		loadedVersion,
		setLoadedVersion,
		updateVersion,
		initNodeTypes,
		versionsList,
		setVersionsList,
		setWorkflowId,
		workflowid

	}

	return (
		<NodeContext.Provider
			value={value}
		>
			{children}
		</NodeContext.Provider>
	)

}

export const useNodeContext = () => {
	const context = useContext(NodeContext)

	if (!context) {
		throw new Error("Node Context is not Working")
	}

	return context
}
