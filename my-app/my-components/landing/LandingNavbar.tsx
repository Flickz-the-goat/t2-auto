import { Button } from "@/components/ui/button"
import { auth0 } from "@/lib/auth0"
import { ALargeSmall, ArrowRight } from "lucide-react"
import LandingNavbarUserInfo from "./LandingNavbarUserInfo";

export default async function LandingNavbar() {
	const session = await auth0.getSession();
	const user = session?.user

	return (
		<div className="sticky top-0 z-50 p-4 backdrop-blur-sm">
			<nav>
				<div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 rounded-xl border border-border bg-background/70 shadow-sm">
					<div className="flex items-center gap-2">
						<ALargeSmall className="w-7 h-7 text-foreground" />
					</div>

					{
						user ? (
							<LandingNavbarUserInfo user={user}/>
						) : (

							<a href="/auth/login">
								<Button size="sm" className="font-bold group ">
									Log in
									<ArrowRight className="group-hover:-rotate-45 duration-300 transition-transform" />
								</Button>
							</a>
						)
					}
				</div>
			</nav >
		</div >
	)
}
