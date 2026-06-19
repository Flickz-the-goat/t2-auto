import { NodeHandlerType } from "@/execution/core/types"
import nodemailer from "nodemailer"
import { GmailNodeType } from "./type"

export const HandleGmail: NodeHandlerType = async (nodeData) => {
	const emailNode = nodeData as GmailNodeType
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: emailNode.config.userEmail,
				clientId: emailNode.config.clientId,
				clientSecret: emailNode.config.clientSecret,
				refreshToken: emailNode.config.refreshToken,
			},
		})

		const res = await transporter.sendMail({
			from: emailNode.config.userEmail,
			to: emailNode.config.to,
			cc: emailNode.config.cc,
			subject: emailNode.config.subject,
			html: `<div>
			${emailNode.config.html}
			</div>`
		})

		return {
			status: "Success",
			output: res.response
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
