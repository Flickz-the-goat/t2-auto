import { auth0 } from "@/lib/auth0";
import DashboardNavbar from "./my-components/DashboardNavbar";
import WorkflowTable from "./my-components/WorkflowTable";
import UsageCharts from "./my-components/UsageCharts";

export default async function Dashboard() {


	const session = await auth0.getSession()
	const user = session?.user
	if (!session || !user) return null

	return (
		<div>
			<DashboardNavbar />
			<div className="max-w-7xl mx-auto px-6 py-10 flex-col gap-12 flex">
				<div className="flex flex-col gap-2">
					<h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.95]">
						Wecome to your Dashboard
					</h1>
					<h1 className="text-5xl md:text-7xl font-black tracking-tight text-primary leading-[0.95]">
						{"{ "+user.nickname+" }"}
					</h1>
				</div>

			<WorkflowTable />
			<UsageCharts />
			</div>
		</div>

	)
}
