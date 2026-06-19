"use client"
import { FieldGroup, FieldLegend, FieldDescription, FieldSet, Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { NodeConfigProps } from "../NodeContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BaseNodeType } from "../type";
import { HttpRequestNodeType } from "./type";
import { useState } from "react";

export default function HttpRequestConfig({ node, setNode }: NodeConfigProps) {
	const [data, setData] = useState<HttpRequestNodeType>(node.data as HttpRequestNodeType)

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
		<div className="w-full min-h-fit max-h-[60%] p-4">
			<FieldGroup>
				<FieldSet>
					<FieldLegend>HTTP Request</FieldLegend>
					<FieldDescription>
						Quickly send a http request to any endpoint
					</FieldDescription>

					<Field>
						<FieldLabel
							htmlFor="method-selector"
						>
							Request Method
						</FieldLabel>
						<Select value={data.config.method || ""}
							onValueChange={(value) => updateData("method", value)}
						>
							<SelectTrigger
								id="method-selector"
							>
								<SelectValue placeholder="Method" />
							</SelectTrigger>
							<SelectContent
								position="popper"
							>
								<SelectGroup>
									<SelectItem
										value="GET"
									>
										GET
									</SelectItem>
									<SelectItem
										value="POST"
									>
										POST
									</SelectItem>

								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="endpoint-input"
						>
							Request Endpoint
						</FieldLabel>
						<Input
							value={data.config.endpoint || ""}
							onChange={(e) => updateData("endpoint", e.target.value)}
							placeholder="https://endpoint.com?"
							id="endpoint-input"
						/>
					</Field>
				</FieldSet>
				<FieldSeparator />
			</FieldGroup>
		</div>
	)

}
