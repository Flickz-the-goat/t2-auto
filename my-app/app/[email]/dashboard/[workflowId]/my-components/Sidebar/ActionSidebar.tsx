import { ItemGroup } from "@/components/ui/item";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, } from "@/components/ui/sidebar";
import { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import ItemCard from "./ItemCard";
import { ArrowLeft } from "lucide-react";
import { actionNodes } from "./nodes/actionNodes";

export default function ActionSidebar({ setOpened }: { setOpened: React.Dispatch<SetStateAction<string>> }) {
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
						Action Nodes
					</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						Action types
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<ItemGroup className="gap-2">
							{
								actionNodes.map((node) => (
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
