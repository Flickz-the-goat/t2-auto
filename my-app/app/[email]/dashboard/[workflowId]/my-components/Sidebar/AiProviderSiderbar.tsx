import { ItemGroup } from "@/components/ui/item";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, } from "@/components/ui/sidebar";
import { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import ItemCard from "./ItemCard";
import { ArrowLeft, ZodiacGemini } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";

const aiNodes = {
	"gemini": [
		{
			name: "Gemini Chat",
			desc: "Generate simple text or images using gemini",
			icon: <Image src={"/gemini.svg"} alt="gemini Node" fill/>,
			type: "geminiNode"
		},
	]
}
export default function AiProviderSidebar({ setOpened }: { setOpened: React.Dispatch<SetStateAction<string>> }) {
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
						Ai Providers
					</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						Supported Providers
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<Collapsible>
							<CollapsibleTrigger>
								Gemini
							</CollapsibleTrigger>
							<CollapsibleContent>
								<ItemGroup className="gap-2">
									{
										aiNodes["gemini"].map((node) => (
											<ItemCard node={node} key={node.name} />
										))
									}
								</ItemGroup>
							</CollapsibleContent>
						</Collapsible>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</>
	)
}
