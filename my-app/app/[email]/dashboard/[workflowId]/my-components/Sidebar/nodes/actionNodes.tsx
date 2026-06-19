import { Globe } from "lucide-react";
import Image from "next/image";
import { sidebarNode } from "../ItemCard"

export const actionNodes: sidebarNode[] = [
	{
		name: "HTTP Request",
		desc: "Send a HTTP request to any endpoint",
		icon: <Globe className="h-8 w-8 stroke-zinc-500" />,
		type: "httpRequest"
	},
	{
		name: "Gmail Node",
		desc: "Perform actions within your workflow",
		icon: <div className="h-8 w-8 relative"> <Image src={"/gmail.svg"} alt={"Gmail SVG"} fill /> </div>,
		type: "gmailNode"
	},
]
