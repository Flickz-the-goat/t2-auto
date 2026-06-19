import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import FlowSidebar from "./my-components/Sidebar/FLowSidebar"
import { ReactFlowProvider } from "@xyflow/react"
import { NodeContextProvider } from "./my-components/nodes/NodeContext"
import NodePanel from "./my-components/nodes/NodePanel"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ReactFlowProvider>
			<SidebarProvider>
				<NodeContextProvider>
					<FlowSidebar />
					<main>
						{children}
						<NodePanel />
					</main>

				</NodeContextProvider>
			</SidebarProvider>
		</ReactFlowProvider>
	)
}
