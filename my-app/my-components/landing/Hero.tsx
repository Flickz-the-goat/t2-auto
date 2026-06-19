import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, MousePointer2Icon, Bot, Globe } from "lucide-react"

export default function Hero() {
	return (
		<section className="relative overflow-hidden">
			<div className="max-w-6xl mx-auto px-6 py-28 flex flex-col items-center justify-center">
				<div className="max-w-3xl text-center flex flex-col items-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
						<Sparkles className="w-4 h-4 text-primary" />
						AI-powered workflow automation
					</div>

					<h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.95]">
						Build workflows
						<span className="block text-primary">
							visually & faster
						</span>
					</h1>

					<p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
						Create powerful automations with drag-and-drop nodes,
						real-time execution, and AI-assisted logic — all inside
						a modern visual editor.
					</p>

					<div className="mt-8 flex items-center gap-4">
						<a
							href="auth/login"
						>
							<Button size="lg" className="gap-2 group">
								Get Started

								<ArrowRight className="w-4 h-4 group-hover:translate-x-5 duration-300 transition-all group-hover:opacity-0" />
							</Button>
						</a>

					</div>


					<div className="mt-14 rounded-3xl border border-border bg-card/50 p-4 shadow-2xl backdrop-blur-sm">
						<div className="rounded-2xl border border-border bg-background p-6">
							<div className="flex items-center gap-3 border-b-2 border-border pb-4">
								<div className="h-3 w-3 rounded-full bg-red-400" />
								<div className="h-3 w-3 rounded-full bg-yellow-400" />
								<div className="h-3 w-3 rounded-full bg-green-400" />
							</div>
							<div className="py-8">
								<div className="mt-8 flex items-center gap-4 flex-wrap">
									<div className="rounded-xl border border-border bg-card px-5 py-4">
										<MousePointer2Icon className="stroke-green-500" />
									</div>

									<div className="h-px w-12 bg-border" />

									<div className="rounded-xl border border-primary/30 bg-primary/10 px-5 py-4">
										<Bot className="stroke-foreground/70" />
									</div>

									<div className="h-px w-12 bg-border" />

									<div className="rounded-xl border border-border bg-card px-5 py-4">
										<Globe className="stroke-foreground/70" />
									</div>

									<div className="h-px w-12 bg-border" />

									<div className="rounded-xl border border-border bg-card px-5 py-4">
										<p className="text-sm text-muted-foreground">
											Response
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
