import { Button } from "@/components/ui/button"
import { useUser } from "@auth0/nextjs-auth0/client";
import { ALargeSmall, ArrowLeft } from "lucide-react"
import Link from "next/link";

export default function ExecutionsNavbar({ workflowId }: {
	workflowId: string
}) {
	const { user } = useUser()


	return (
		<div className="top-4 sticky backdrop-blur-sm">
			<nav>
				<div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 rounded-xl border border-border bg-background/70 shadow-sm">
					<Link href={`/${user?.email}/dashboard`}>
						<div className="flex items-center gap-2
							hover:brightness-75
						">
							<ALargeSmall className="w-7 h-7 text-foreground
							" />
						</div>
					</Link>
					<Link href={`/${user?.email}/dashboard/${workflowId}`}>
						<Button
							size={"sm"}
						>
							<ArrowLeft /> Go to workflow
						</Button>
					</Link>
				</div>

				<div>
				</div>
			</nav >
		</div >
	)
}
