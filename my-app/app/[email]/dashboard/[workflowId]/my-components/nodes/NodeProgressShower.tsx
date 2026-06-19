import { Check, X } from "lucide-react"

export default function NodeStatusShower({ status }: { status: string }) {

	if (status === "initial") return

	return (
		<div
			className={`
			${status === "success" && "bg-emerald-600  border-emerald-700"}
			${status === "error" && "bg-red-500 stroke-red-700 border-red-700"}
			rounded-full w-4 h-4 absolute -top-1 -right-1 flex items-center justify-center
			`}
		>
			{
				status === "success" && <Check className="w-3 h-3 stroke-green-900" />
			}
			{
				status === "error" && <X className="w-3 h-3 stroke-red-900" />
			}
			{
				status === "initial" && <></>
			}
		</div>
	)
}
