import { Node } from "@xyflow/react";
import { NodeType } from "../type";

export interface GmailNodeType extends NodeType {
	config: {
		userEmail: string,
		clientId: string,
		clientSecret: string,
		refreshToken: string,

		to: string,
		cc: string, // comma seperated list for cc
		subject: string,
		html: string
	}
}

export type gmailNode = Node<GmailNodeType, "gmailNode">
