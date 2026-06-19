import ManualTrigger from "./manualTrigger/ManualTrigger"
import HttpRequestNode from "./httpRequestNode/HttpRequestNode"
import HttpRequestConfig from "./httpRequestNode/HttpRequestConfig"
import GmailNode from "./gmailNode/GmailNode"
import GmailNodeConfig from "./gmailNode/GmailNodeConfig"
import WebhookNode from "./webhookNode/WebhookNode"
import WebhookNodeConfig from "./webhookNode/WebhookNodeConfig"
import GeminiNode from "./geminiNode/GeminiNode"
import GeminiNodeConfig from "./geminiNode/GeminiNodeConfig"

interface nodeComponents {
	nodeComponent: any,
	nodeConfig: any,
}



export const nodeRegistry: Record<string, nodeComponents> = {
	"manualTrigger": {
		nodeComponent: ManualTrigger,
		nodeConfig: null,
	},
	"webhookTrigger": {
		nodeComponent: WebhookNode,
		nodeConfig: WebhookNodeConfig,
	},
	"httpRequest": {
		nodeComponent: HttpRequestNode,
		nodeConfig: HttpRequestConfig,
	},
	"gmailNode": {
		nodeComponent: GmailNode,
		nodeConfig: GmailNodeConfig,
	},
	"geminiNode": {
		nodeComponent: GeminiNode,
		nodeConfig: GeminiNodeConfig
	}
}
