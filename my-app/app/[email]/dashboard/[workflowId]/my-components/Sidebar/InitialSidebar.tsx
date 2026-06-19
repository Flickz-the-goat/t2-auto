"use client"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, } from "@/components/ui/sidebar";
import { ArrowRight, Bookmark, Bot, Cog, Stars, Zap } from "lucide-react";
import { SetStateAction } from "react";


const mainNodeTypes = [
	{
		name: "Trigger nodes",
		desc: "A wide variety of trigger nodes",
		icon: <Zap className="fill-emerald-600/90 stroke-1 stroke-none h-16 w-16" />,
		open: "trigger"
	},
	{
		name: "Action Nodes",
		desc: "Perform actions within your workflow",
		icon: <Cog className="stroke-zinc-400 h-16 w-16" />,
		open: "action"
	},
	{
		name: "AI Nodes",
		desc: "Interact with AI models",
		icon: <Bot className="h-16 w-16 stroke-violet-700" />,
		open: "ai"
	}
]
export default function InitialSidebar({ setOpened }: { setOpened: React.Dispatch<SetStateAction<string>> }) {

	return (
		<>
			<SidebarHeader className="py-4">
				<h1 className="text-xl text-center font-bold">
					Workflow Nodes
				</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						Node types
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<ItemGroup className="gap-2">
							{
								mainNodeTypes.map((node) => (
									<Item key={node.name}
										role="listitem"
										variant={"outline"}
										className="hover:bg-zinc-300/10 hover:cursor-pointer"
										onClick={() => setOpened(node.open)}
									>
										<ItemMedia variant={"image"}>
											{node.icon}
										</ItemMedia>
										<ItemContent>
											<ItemTitle>
												{node.name}
											</ItemTitle>
											<ItemDescription>
												{node.desc}
											</ItemDescription>
										</ItemContent>
										<ItemContent>
											<ItemTitle>
												<ArrowRight className="h-4 w-4 stroke-zinc-400" />
											</ItemTitle>
										</ItemContent>
									</Item>
								))
							}
						</ItemGroup>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>
						Templates
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<ItemGroup>
							<Item
								role="listitem"
								variant={"outline"}
								className="hover:bg-zinc-300/10 hover:cursor-pointer"
							>
								<ItemMedia variant={"image"}>
									<Bookmark className="h-8 w-8 fill-yellow-600 stroke-none" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>
										Your Templates
									</ItemTitle>
									<ItemDescription>
										Select from your saved templates
									</ItemDescription>
								</ItemContent>
								<ItemContent>
									<ItemTitle>
										<ArrowRight className="h-4 w-4 stroke-zinc-400" />
									</ItemTitle>
								</ItemContent>
							</Item>
							<Item
								role="listitem"
								variant={"outline"}
								className="hover:bg-zinc-300/10 hover:cursor-pointer"
							>
								<ItemMedia variant={"image"}>
									<Stars
										className="
			h-8 w-8
			stroke-none
			fill-transparent
		"
										style={{
											fill: "url(#star-gradient)"
										}}
									/>
									<svg width="0" height="0">
										<linearGradient id="star-gradient" cx="50%" cy="50%" r="75%">
											<stop offset="0%" stopColor="#facc15" />
											<stop offset="55%" stopColor="#a855f7" />
											<stop offset="100%" stopColor="#6d28d9" />
										</linearGradient>
									</svg>							</ItemMedia>
								<ItemContent>
									<ItemTitle>
										Browse Templates
									</ItemTitle>
									<ItemDescription>
										Quickly find usefull templates made by other users
									</ItemDescription>
								</ItemContent>
								<ItemContent>
									<ItemTitle>
										<ArrowRight className="h-4 w-4 stroke-zinc-400" />
									</ItemTitle>
								</ItemContent>
							</Item>


						</ItemGroup>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</>
	)
}
