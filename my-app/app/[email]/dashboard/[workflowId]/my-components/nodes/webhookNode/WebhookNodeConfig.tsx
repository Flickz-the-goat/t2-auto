"use client"
import { FieldGroup, FieldLegend, FieldDescription, FieldSet, Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { NodeConfigProps, useNodeContext } from "../NodeContext";
import { Input } from "@/components/ui/input";
import { BaseNodeType } from "../type";
import { useState } from "react";
import { webhookNodeType } from "./type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function WebhookNodeConfig({ node, setNode }: NodeConfigProps) {
	const [data, setData] = useState<webhookNodeType>(node.data as webhookNodeType)
	const { workflowid } = useNodeContext()

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
					<FieldLegend>Webhook Information</FieldLegend>
					<FieldDescription>
						Connect to an external webhook
					</FieldDescription>

					<Field>
						<FieldLabel
							htmlFor="webhook-input" >
							Webhook endpoint
						</FieldLabel>
						{
							data.config.endpoint ? (
								<Input
									value={data.config.endpoint}
									onChange={(e) => updateData("userEmail", e.target.value)}
									placeholder="user@email.com"
									id="webhook-input"
									disabled
								/>
							) : (
								<Button
									onClick={() => {
										updateData("endpoint", `open-colonize-mayday.ngrok-free.dev/api/webhook/${workflowid}`)
									}}
									size={"sm"}
									variant={"outline"}
								>
									<Plus /> Generate Endpoint
								</Button>
							)
						}
					</Field>
				</FieldSet>
			</FieldGroup>
		</div>
	)
}
