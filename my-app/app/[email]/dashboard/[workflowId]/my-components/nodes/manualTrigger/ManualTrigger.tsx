import { Handle, NodeProps, Position } from "@xyflow/react";
import { manualTrigger } from "./type";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "@/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { MousePointer2 } from "lucide-react";

export default function ManualTrigger({ id, data }: NodeProps<manualTrigger>) {

	return (
		<NodeTooltip>
			<NodeTooltipTrigger>
				<BaseNode className="w-16 h-16 items-center justify-center flex">
					<BaseNodeContent className="flex items-center flex-center">
						<MousePointer2 className="stroke-green-500" />
					</BaseNodeContent>
				</BaseNode>
			</NodeTooltipTrigger>
			<NodeTooltipContent>
				{id}
			</NodeTooltipContent>

			<Handle position={Position.Right} type="source" id={`${id}-source`}
			/>
		</NodeTooltip>
	)
}
