import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ArrowRight } from "lucide-react";

interface Props {
	title: string,
	description: string | undefined,
	action: any
	current?: boolean
	loaded?: boolean
	status?: string 
	executions?: boolean
	id: any
}
export default function SidebarItem({
	title,
	description,
	action,
	current,
	loaded,
	id,
	executions,
	status
}: Props) {

	return (
		<Item
			variant={"outline"}
			role="listitem"
			className={`rounded-none ${current ? "border-r-emerald-700 border-2" : ""} hover:cursor-pointer
			${loaded ? "border-r-blue-700 border-2" : ""} 
			hover:bg-zinc-300/10 
			`}
			onClick={() => action(id)}

		>
			<ItemContent>
				<ItemTitle className="flex justify-between">
					<p>
						{title}
					</p>
					{
						executions &&
						(
							<Badge
								variant={"outline"}
								className={`
									${status == "Success" ?
										("bg-emerald-500/10 border-emerald-700") :
										("bg-red-500/10 border-red-700")}
							`}
							>
								{status}
							</Badge>
						)
					}
				</ItemTitle>
				<ItemDescription>
					{description}
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<ArrowRight
					className="stroke-zinc-400 h-4 w-4"
				/>
			</ItemActions>
		</Item>
	)
}
