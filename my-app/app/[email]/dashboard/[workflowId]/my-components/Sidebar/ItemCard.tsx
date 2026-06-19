import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useSidebar } from "@/components/ui/sidebar";
import { useNodes, useReactFlow } from "@xyflow/react";
import { Plus } from "lucide-react";
import { addNode } from "../nodes/type";
import { useNodeContext } from "../nodes/NodeContext";

export interface sidebarNode {
	name: string,
	desc: string,
	icon: any,
	type: string

}
export default function ItemCard({ node }: { node: sidebarNode }) {
	const { addNodes, getNodes } = useReactFlow()
	const { setOpen } = useSidebar()
	const { addNodeType, addNodeConfig } = useNodeContext()
	return (
		<Item key={node.name}
			role="listitem"
			variant={"outline"}
			className="hover:bg-zinc-300/10 hover:cursor-pointer"
			onClick={() => {
				addNodeType(node.type)
				addNodeConfig(node.type)
				addNode({ getNodes, addNodes, setOpen, node })
			}}
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
			<ItemActions>
				<Plus className="h-4 w-4 stroke-zinc-400" />
			</ItemActions>
		</Item>

	)
}

