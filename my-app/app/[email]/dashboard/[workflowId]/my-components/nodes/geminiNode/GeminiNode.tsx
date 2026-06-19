import { Handle, NodeProps, Position } from "@xyflow/react";
import { geminiNode } from "./type";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "@/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { Globe } from "lucide-react";
import { NodeAppendix } from "@/components/node-appendix";
import NodeStatusShower from "../NodeProgressShower";
import Image from "next/image";

export default function GeminiNode({ id, data }: NodeProps<geminiNode>) {

	return (
		<NodeTooltip>
			<NodeTooltipTrigger>
				<BaseNode className="relative w-16 h-16 items-center justify-center flex">
					<NodeAppendix position="bottom" className="p-0 bg-transparent border-none font-bold text-foreground text-xs">
					</NodeAppendix>
					<BaseNodeContent className="flex items-center flex-center">
						<div className="relative h-8 w-8">
							<Image
								src={"/gemini.svg"}
								alt="Gemini Node"
								fill
								/>

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
