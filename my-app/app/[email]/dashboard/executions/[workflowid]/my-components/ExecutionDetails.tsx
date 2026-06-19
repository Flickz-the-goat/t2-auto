"use client"
import { useEffect, useState } from "react"
import { type Executions, type NodeExecutionData } from "@/generated/prisma/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"


interface Props {
	selectedExecution: Executions,
}
export default function ExecutionDetails({
	selectedExecution
}: Props
) {
	const [nodeData, setNodeData] = useState<NodeExecutionData[]>()

	useEffect(() => {
		const getExecution = async () => {
			const res = await fetch(`/api/workflow/executions/getOne`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ executionid: selectedExecution.id }),
			})
			if (!res.ok) return

			const { nodeData } = await res.json()
			setNodeData(nodeData)
			console.log(nodeData)


		}
		getExecution()
	}, [selectedExecution])

	if (!selectedExecution) return

	return (
		<div className="max-w-7xl mx-auto px-6 py-10 flex-col gap-12 flex">
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center w-full">
					<h1 className="mt-6 text-5xl md:text-5xl font-black tracking-tight text-foreground leading-[0.95]">
						Execution {selectedExecution.id}
					</h1>
					<Badge
						className={
							selectedExecution.status == "Success" ? "bg-emerald-500/30 border-emerald-700"
								: "bg-red-500/30 border-red-700"
						}
					>
						{selectedExecution.status}
					</Badge>
				</div>
				<p className="text-zinc-500">
					{selectedExecution.updatedat && (`Latest run: ${new Date(selectedExecution.updatedat).toString()}`)}
				</p>

				<p className="text-zinc-500">
					{selectedExecution.message}
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="my-6 text-2xl md:text-2xl font-black tracking-tight text-foreground leading-[0.95]">
					Detailed Info
				</h1>

				{
					nodeData?.map((n) => (
						<Card
							key={n.id}
						>
							<CardContent>
								<Collapsible className="group/collapsible">
									<CollapsibleTrigger asChild>
										<div>
											<div
												className="flex justify-between items-center"
											>

												<h1
													className="font-bold text-lg"
												>Node: {n.nodeid}</h1>
												<div
													className="fill-foreground flex gap-2"
												>
													<Badge
														className={
															n.status == "Success" ? "bg-emerald-500/30 border-emerald-700"
																: "bg-red-500/30 border-red-700"
														}
													>
														{n.status}
													</Badge>

													<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
												</div>
											</div>
											<p
												className="text-zinc-500"
											>
												{n.message ?? ""}
											</p>
										</div>

									</CollapsibleTrigger>
									<CollapsibleContent>
										<div
											className="flex flex-col gap-2 mt-4"
										>
											<h1>Input</h1>
											<code
												className="bg-muted p-2 rounded-md
											max-h-64
											overflow-y-scroll
											"
											>
												<pre>
													{JSON.stringify(n.input, null, 2)}
												</pre>
											</code>
											<h1>Output</h1>
											<code
												className="bg-muted p-2 rounded-md
											max-h-64
											overflow-y-scroll
											"
											>
												<pre>
													{
														typeof n.output == "object" ? 
														JSON.stringify(n.output, null, 2)
														: n.output
													}
												</pre>
											</code>

										</div>
									</CollapsibleContent>
								</Collapsible>
							</CardContent>
						</Card>
					))
				}
			</div>
		</div>

	)
}
