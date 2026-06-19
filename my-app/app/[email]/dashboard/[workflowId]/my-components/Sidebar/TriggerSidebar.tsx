"use client"

import { ItemGroup } from "@/components/ui/item";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, } from "@/components/ui/sidebar";
import { ArrowLeft, Clock, MousePointer2, Plus, WebhookIcon } from "lucide-react";
import { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import ItemCard, { sidebarNode } from "./ItemCard";

const triggerNodes: sidebarNode[] = [
	{
		name: "Manual Trigger",
		desc: "A wide variety of trigger nodes",
		icon: <MousePointer2 className="stroke-emerald-500 h-8 w-8" />,
		type: "manualTrigger"
	},
	{
		name: "Webhook Trigger",
		desc: "Perform actions within your workflow",
		icon: <WebhookIcon className="stroke-violet-500 h-8 w-8" />,
		type: "webhookTrigger"
	},
	{
		name: "Schedule Trigger",
		desc: "Interact with AI models",
		icon: <Clock className="h-8 w-8 stroke-blue-500" />,
		type: "scheduleTrigger"
	}
]

export default function TriggerSidebar({ setOpened }: { setOpened: React.Dispatch<SetStateAction<string>> }) {
	return (
		<>
			<SidebarHeader>
				<div className="py-4 flex gap-4">
					<Button
						variant={"outline"}
						size={"icon-sm"}
						onClick={() => setOpened("initial")}
						className="stroke-foreground"
					>
						<ArrowLeft />
					</Button>
					<h1 className="text-xl text-center font-bold">
						Trigger Nodes
					</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						Trigger types
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<ItemGroup className="gap-2">
							{
								triggerNodes.map((node) => (
									<ItemCard node={node} key={node.name} />
								))
							}
						</ItemGroup>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</>
	)
}
