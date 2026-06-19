"use client"
import { Spinner } from "@/components/ui/spinner";
import { Workflows } from "@/generated/prisma/client";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Edge, Node, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FlowNavbar from "./my-components/FlowNavbar";
import { useNodePanel } from "./my-components/nodes/store";
import { useNodeContext } from "./my-components/nodes/NodeContext";

export interface VersionList {
	id: number,
	versionNum: number,
}
export default function Workflow() {

	const { workflowId } = useParams()
	const [workflow, setWorkflow] = useState<Workflows>()

	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])
	const [loading, setLoading] = useState(false)
	const { openNode } = useNodePanel()
	const { nodeTypes, loadedVersion, setLoadedVersion, initNodeTypes,
		versionsList, setVersionsList, setWorkflowId
	} = useNodeContext()

	const onNodesChange = useCallback((changes: any) => setNodes((currNodes) => applyNodeChanges(changes, currNodes)), [setNodes],)
	const onEdgesChange = useCallback((changes: any) => setEdges((currEdges) => applyEdgeChanges(changes, currEdges)), [setEdges],)
	const onConnect = useCallback((newEdge: any) => setEdges((currEdges) => addEdge(newEdge, currEdges)), [setEdges],)




	const getWorkflow = async () => {
		setLoading(true)
		const res = await fetch(`/api/workflow/getOne/${workflowId}`)

		if (!res.ok) return

		const { workflow, currVersion, versionsList } = await res.json()

		setWorkflow(workflow)
		setWorkflowId(String(workflow.id))
		setLoadedVersion(currVersion)
		setVersionsList(versionsList)
		initNodeTypes(currVersion.nodes as Node[])
		setNodes(currVersion.nodes ? currVersion.nodes : [])
		setEdges(currVersion.edges ? currVersion.edges : [])
		setLoading(false)
	}
	useEffect(() => {
		getWorkflow()

	}, [workflowId])

	if (loading) {
		return (
			<div className="h-screen w-screen flex flex-col items-center justify-center">
				<Spinner />
				<p>Loading your workflow in...</p>
			</div>
		)
	}

	if (!workflow || !loadedVersion) {
		return (
			<div className="h-screen w-screen flex flex-col items-center justify-center">
				Workflow not loaded <strong>Refresh</strong>
			</div>

		)
	}

	const updateWorflow = async (values: any, refetch: boolean) => {
		const res = await fetch(`/api/workflow/update`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: workflow.id, ...values })
		})

		if (!res.ok) {
			console.log("Error with response", await res.json())
			return
		}

		const { updatedWorkflow } = await res.json()

		if (refetch) {
			getWorkflow()
		}
		else setWorkflow(updatedWorkflow)
	}

	const onVersionChange = async (versionId: number) => {
		setLoading(true)
		const res = await fetch(`/api/workflow/load/${versionId}`)

		if (!res.ok) {
			console.log("Error with response", res)
			return
		}

		const { newVersion } = await res.json()

		setLoadedVersion(newVersion)
		initNodeTypes(newVersion.nodes as Node[])
		console.log(nodeTypes)
		setNodes(newVersion.nodes ? newVersion.nodes : [])
		setEdges(newVersion.edges ? newVersion.edges : [])
		setLoading(false)
	}

	const createNewVersion = async () => {
		setLoading(true)
		const res = await fetch(`/api/workflow/create/version`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ version: loadedVersion })
		})

		if (!res.ok) {
			console.log("Error creating new version", res)
			return
		}
		const { newVersion, versionsList } = await res.json()

		setLoadedVersion(newVersion)
		setVersionsList(versionsList)
		setNodes(newVersion.nodes ? newVersion.nodes : [])
		setNodes(newVersion.edges ? newVersion.edges : [])
		setLoading(false)
	}

	const getColorMode = () => {
		return "dark" in document.querySelector("body")!.classList.entries ? true : false
	}

	return (
		<div className="h-screen w-screen">
			<ReactFlow
				nodes={nodes} edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
				colorMode={`${getColorMode() ? "dark" : "light"}`}
				onNodeClick={(_, node) => {
					if (node.type! !== "manualTrigger") openNode(node.id)
				}}
				className="z-0"
			>
				<Background />
				<FlowNavbar name={workflow?.name || "Untitled"}
					currVersion={workflow.currVersion}
					versionsList={versionsList}
					updateWorkflow={updateWorflow}
					loadedVersion={loadedVersion.id}
					onVersionChange={onVersionChange}
					createNewVersion={createNewVersion}
					workflowId={workflow.id}
					loadedVersionName={String(loadedVersion.versionNum)}
				/>


			</ReactFlow>
		</div>

	);
}
