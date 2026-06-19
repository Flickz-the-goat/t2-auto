import { auth0 } from "@/lib/auth0";
import LandingNavbarUserInfo from "@/my-components/landing/LandingNavbarUserInfo";
import { ALargeSmall } from "lucide-react";

export default async function DashboardNavbar() {
	const session = await auth0.getSession();
	const user = session?.user

	if(!user) return null

	return (
		<div className="sticky top-0 z-50 p-4 backdrop-blur-sm">
			<nav>
				<div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 rounded-xl border border-border bg-background/70 shadow-sm">
					<div className="flex items-center gap-2">
						<ALargeSmall className="w-7 h-7 text-foreground" />
					</div>

					<LandingNavbarUserInfo user={user} />
				</div>
			</nav >
		</div >
	)

}
