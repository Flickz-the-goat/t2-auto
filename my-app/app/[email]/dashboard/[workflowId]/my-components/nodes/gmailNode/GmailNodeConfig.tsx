"use client"
import { FieldGroup, FieldLegend, FieldDescription, FieldSet, Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { NodeConfigProps } from "../NodeContext";
import { Input } from "@/components/ui/input";
import { BaseNodeType } from "../type";
import { useState } from "react";
import { GmailNodeType } from "./type";

export default function GmailNodeConfig({ node, setNode }: NodeConfigProps) {
	const [data, setData] = useState<GmailNodeType>(node.data as GmailNodeType)

	const updateData = (field: string, value: any) => {
		setNode((n: BaseNodeType) => {
			return {
				...n,
				data: {
					...n.data,
					config: {
						...n.data.config,
						[field]: value
					}
				}
			}
		})

		setData({
			...data,
			config: {
				...data.config,
				[field]: value,
			}
		})

	}

	return (
		<div className="w-full h-fit max-h-[60%] overflow-y-scroll p-4">
			<FieldGroup>
				<FieldSet>
					<FieldLegend>Your information</FieldLegend>
					<FieldDescription>
						Connect to your gmail
					</FieldDescription>

					<Field>
						<FieldLabel
							htmlFor="email-input" >
							Your Email
						</FieldLabel>
						<Input
							value={data.config.userEmail || ""}
							onChange={(e) => updateData("userEmail", e.target.value)}
							placeholder="user@email.com"
							id="email-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="clientId-input"
						>
							Client ID
						</FieldLabel>
						<Input
							value={data.config.clientId || ""}
							onChange={(e) => updateData("clientId", e.target.value)}
							placeholder="sh***key"
							id="clientId-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="clientSecret-input"
						>
							Client Secret
						</FieldLabel>
						<Input
							value={data.config.clientSecret || ""}
							onChange={(e) => updateData("clientSecret", e.target.value)}
							placeholder="secret***key"
							id="clientSecret-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="refreshToken-input"
						>
							Refresh Token
						</FieldLabel>
						<Input
							value={data.config.refreshToken || ""}
							onChange={(e) => updateData("refreshToken", e.target.value)}
							placeholder="refresh token"
							id="refreshToken-input"
						/>
					</Field>

				</FieldSet>
				<FieldSeparator />
				<FieldSet>
					<FieldLegend>Email Specific Information</FieldLegend>
					<FieldDescription>
						Write and send a email to anyone of your friends or collegues.
					</FieldDescription>
					<Field>
						<FieldLabel
							htmlFor="to-input"
						>
							Email to:
						</FieldLabel>
						<Input
							value={data.config.to || ""}
							onChange={(e) => updateData("to", e.target.value)}
							placeholder="friend@email.com"
							id="to-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="cc-input"
						>
							CC list: (seperated by comma [ , ] )
						</FieldLabel>
						<Input
							value={data.config.cc || ""}
							onChange={(e) => updateData("cc", e.target.value)}
							placeholder="friend@email.com,friend2@email.com"
							id="cc-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="subject-input"
						>
							Email Subject
						</FieldLabel>
						<Input
							value={data.config.subject || ""}
							onChange={(e) => updateData("subject", e.target.value)}
							placeholder="Email subject"
							id="subject-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="html-input"
						>
							Email body (html or plain text)
						</FieldLabel>
						<textarea
							value={data.config.html || ""}
							onChange={(e) => updateData("html", e.target.value)}
							placeholder="Email body"
							id="html-input"
							className="h-32 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"						
							/>
					</Field>




				</FieldSet>

			</FieldGroup>
		</div>
	)
}
