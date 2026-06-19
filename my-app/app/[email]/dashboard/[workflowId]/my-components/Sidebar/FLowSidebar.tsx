"use client"
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Panel } from "@xyflow/react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import InitialSidebar from "./InitialSidebar";
import TriggerSidebar from "./TriggerSidebar";
import { AnimatePresence, motion } from "motion/react";
import ActionSidebar from "./ActionSidebar";
import AiProviderSidebar from "./AiProviderSiderbar";


export default function FlowSidebar() {

	const [opened, setOpened] = useState<string>("initial")
	const { open, setOpen } = useSidebar()

	return (
		<Panel position="center-left" className="h-full relative">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className={`
		absolute top-6 z-50 transition-all duration-300
		${open ? "left-86" : "left-4"}
	`} onClick={() => setOpen(!open)}>
							{
								open ? <PanelLeftClose className="w-6 h-6 stroke-zinc-400" /> : <PanelLeftOpen className="w-6 h-6 stroke-zinc-300" />
							}

						</div>
					</TooltipTrigger>
					<TooltipContent
						className={`
							absolute top-1 z-50 transition-all duration-300
							${open ? "left-92 w-32" : "left-10 w-26"}
						`}
						side="right"
					>
						{
							open ? (
								"Collapse Sidebar"
							) : (
								"Open Sidebar"
							)
						}
					</TooltipContent>
				</Tooltip>

			</TooltipProvider>
			<Sidebar
				style={
					{
						"--sidebar-width": "24rem",
					} as React.CSSProperties
				}
			>
				<AnimatePresence mode="wait">
					{
						opened == "initial" && (
							<motion.div
								key="initial"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.2 }}
								className="h-full"
							>
								<InitialSidebar setOpened={setOpened} />
							</motion.div>
						)
					}
					{

						opened == "trigger" && (
							<motion.div
								key="trigger"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.2 }}
								className="h-full"
							>
								<TriggerSidebar setOpened={setOpened} />
							</motion.div>
						)
					}
					{
						opened == "action" && (
							<motion.div
								key="trigger"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.2 }}
								className="h-full"
							>
								<ActionSidebar setOpened={setOpened} />
							</motion.div>
						)
					}
					{
						opened == "ai" && (
							<motion.div
								key="trigger"
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.2 }}
								className="h-full"
							>
								<AiProviderSidebar setOpened={setOpened} />
							</motion.div>
						)
					}


				</AnimatePresence>
			</Sidebar>

		</Panel >
	)
}
