import { NodeHandlerType } from "@/execution/core/types";
import { webhookNodeType } from "./type";

export const HandleWebhook: NodeHandlerType = async (nodeData) => {
	try {
		const webhookNode = nodeData as webhookNodeType
		return {
			status: "Success",
			output: webhookNode.input ?? "Nothing inside webhook body",
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
