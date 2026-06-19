import { TooltipProvider } from "@/components/ui/tooltip";
import { DarkModeSwitch } from "@/app/DarkModeSwitch";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ExecutionsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<TooltipProvider>
				{children}
				<DarkModeSwitch />
			</TooltipProvider>
		</SidebarProvider>
	);
}
