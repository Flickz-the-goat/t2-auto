import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "t2 Automation app",
	description: "Build simple and easy to automated workflows with AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
		>
			<body className="min-h-full flex flex-col relative dark">
				<Auth0Provider>
					<TooltipProvider>
						<Toaster className="dark toast"/>
						{children}
						<DarkModeSwitch />
					</TooltipProvider>
				</Auth0Provider>
			</body>
		</html>
	);
}
