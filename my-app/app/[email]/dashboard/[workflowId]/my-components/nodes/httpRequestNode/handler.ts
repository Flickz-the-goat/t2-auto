import { NodeHandlerType } from "@/execution/core/types"
import { HttpRequestNodeType } from "./type"

export const HttpNodeHandler: NodeHandlerType = async (nodeData) => {
	try {
		const httpNode = nodeData as HttpRequestNodeType

		const res = await fetch(`${httpNode.config.endpoint}`)

		if (!res.ok) throw new Error(` Error Code: ${res.status} Status Text: ${res.statusText}`)

		return {
			status: "Success",
			output: await res.json()
		}
	}
	catch (e) {
		const err = e as Error

		return {
			status: "Failed",
			output: err,
			errorMessage: err.message
		}
	}
}

