import { webhookNode } from "./type";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "@/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { NodeAppendix } from "@/components/node-appendix";
import NodeStatusShower from "../NodeProgressShower";
import { WebhookIcon } from "lucide-react";


export default function WebhookNode({ id, data }: NodeProps<webhookNode>) {
	return (
		<NodeTooltip>
			<NodeTooltipTrigger>
				<BaseNode className="relative w-16 h-16 items-center justify-center flex">
					<NodeAppendix position="bottom" className="p-0 bg-transparent border-none font-bold text-foreground text-xs">
					</NodeAppendix>
					<BaseNodeContent className="flex items-center flex-center">
						<WebhookIcon className="stroke-violet-500 h-8 w-8" />
					</BaseNodeContent>
					<NodeStatusShower status={data.metadata.status} />
				</BaseNode>
			</NodeTooltipTrigger>
			<NodeTooltipContent>
				{id}
			</NodeTooltipContent>

			<Handle position={Position.Right} type="source"
				id={`${id}-source`}
			/>
		</NodeTooltip>
	)
}
