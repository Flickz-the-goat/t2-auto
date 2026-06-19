"use client"
import { Node, useReactFlow } from "@xyflow/react"
import { useNodePanel } from "./store"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion } from "motion/react"
import { useNodeContext } from "./NodeContext"
import PanelEditor from "./PanelEditor"
import { BaseNodeType, NodeType } from "./type"
import { useEffect, useState } from "react"
import { type NodeExecutionData } from "@/generated/prisma/client"
import { JsonValue } from "@prisma/client/runtime/client"
import NodeConfigHelper from "./NodeConfigHelper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NodePanel() {

	const { selectedNodeId, open, close } = useNodePanel()
	const { getNode } = useReactFlow()
	const { nodeConfigs, loadedVersion } = useNodeContext()
	const [input, setInput] = useState<JsonValue>()
	const [output, setOutput] = useState<JsonValue>()
	const [node, setNode] = useState<Node>()
	const [message, setMessage] = useState<string>()

	const getNodeData = async () => {
		if (!selectedNodeId || !open) {
			setInput(null)
			setOutput(null)
			return
		}

		const res = await fetch(`/api/workflow/executions/getNodeData`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
			body: JSON.stringify({ executionid: loadedVersion?.currExecution, nodeid: selectedNodeId })
		})

		if (!res.ok) return

		const { nodeData }: { nodeData: NodeExecutionData } = await res.json()

		const node = getNode(selectedNodeId)
		if (!node) return
		const data = node.data as NodeType
		setNode(node)
		setInput(data.input as JsonValue ?? (nodeData?.input ?? null))
		setOutput(JSON.parse(data.output) as JsonValue ?? (nodeData?.output ?? null))
		setMessage(nodeData?.message ?? "")
	}

	useEffect(() => {
		getNodeData()
	}, [selectedNodeId, loadedVersion?.currExecution, open])

	if (!open || !selectedNodeId) return
	const Config = nodeConfigs[node?.type!]

	if (!node) return
	if (!Config) return

	return (
		<motion.div className="fixed inset-0 flex justify-center items-center p-4 z-40 "
			initial={{ scale: 0.9 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.9 }}
		>
			<ResizablePanelGroup orientation="vertical"
				className="w-[90vw] h-[90vh] rounded-lg border border-border
			bg-background overflow-hidden"
			>
				<ResizablePanel className="w-full"
					defaultSize={"5%"}
				>
					<div className="h-full p-2 flex justify-between items-center">
						<Badge variant="outline" className="border-0">Node Configs</Badge>
						<Badge variant="outline" className="border-0">{node?.type} Config</Badge>
						<Button className="p-2 w-4 h-4 rounded-full" size={"icon-xs"}
							onClick={() => {
								//Save Node Data
								close()
							}}
						>
							<X className="" />
						</Button>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={"95%"}
				>
					<ResizablePanelGroup
						orientation="horizontal"
					>
						<ResizablePanel defaultSize='37.5%'
							className="flex items-center justify-center"

						>
							<PanelEditor data={input} type="input" setAction={setInput} />
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize='25%' className="h-full max-h-full">
							<Config node={node} setNode={setNode} />
							{
								message &&
								(<Card className="mx-2 my-4">
									<CardHeader>
										<CardTitle>
											Latest Execution Message
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="-m-[--card-spacing]w-full">
											{message}
										</div>
									</CardContent>
								</Card>)
							}
							<NodeConfigHelper node={node} data={node.data}
								input={input}
								output={output}
								getNodeData={getNodeData}
							/>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize='37.5%' className="flex items-center justify-center">
							<PanelEditor data={output} type="output" setAction={setInput} />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>

			</ ResizablePanelGroup>
		</motion.div >
	)
}
