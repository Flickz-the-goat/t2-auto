import { Handle, NodeProps, Position } from "@xyflow/react";
import { gmailNode } from "./type";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "@/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { Globe } from "lucide-react";
import { NodeAppendix } from "@/components/node-appendix";
import NodeStatusShower from "../NodeProgressShower";
import Image from "next/image";

export default function GmailNode({ id, data }: NodeProps<gmailNode>) {

	return (
		<NodeTooltip>
			<NodeTooltipTrigger>
				<BaseNode className="relative w-16 h-16 items-center justify-center flex">
					<NodeAppendix position="bottom" className="p-0 bg-transparent border-none font-bold text-foreground text-xs">
					</NodeAppendix>
					<BaseNodeContent className="flex items-center flex-center">
						<div className="h-8 w-8">
							<Image
								src={"/gmail.svg"}
								alt="Gmail Node"
								fill 
								className="stroke-zinc-400" />

						</div>

					</BaseNodeContent>
					<NodeStatusShower status={data.metadata.status} />
				</BaseNode>
			</NodeTooltipTrigger>
			<NodeTooltipContent>
				{id}
			</NodeTooltipContent>

			<Handle position={Position.Left} type="target"
				id={`${id}-target`}
			/>
			<Handle position={Position.Right} type="source"
				id={`${id}-source`}
			/>
		</NodeTooltip>
	)
}
