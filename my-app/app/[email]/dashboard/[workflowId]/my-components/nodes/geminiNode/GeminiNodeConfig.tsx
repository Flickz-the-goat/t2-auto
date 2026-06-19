"use client"
import { FieldGroup, FieldLegend, FieldDescription, FieldSet, Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { NodeConfigProps } from "../NodeContext";
import { Input } from "@/components/ui/input";
import { BaseNodeType } from "../type";
import { useState } from "react";
import { geminiNodeType } from "./type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Editor } from "@monaco-editor/react";

export default function GeminiNodeConfig({ node, setNode }: NodeConfigProps) {
	const [data, setData] = useState<geminiNodeType>(node.data as geminiNodeType)

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
	const getColorMode = () => {
		return document.body.classList.contains("dark")
	}
	const handleChange = (val?: any) => {
		updateData("responseJsonSchema", val)
	}



	return (
		<div className="w-full h-fit max-h-[60%] overflow-y-scroll p-4">
			<FieldGroup>
				<FieldSet>
					<FieldLegend>Your information</FieldLegend>
					<FieldDescription>
						Model Specific Information
					</FieldDescription>
					<Field>
						<FieldLabel
							htmlFor="api-input" >
							Your Gemini API Key
						</FieldLabel>
						<Input
							value={data.config.apiKey || ""}
							onChange={(e) => updateData("apiKey", e.target.value)}
							placeholder="********"
							id="api-input"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="type-selector"
						>
							Model generates
						</FieldLabel>
						<Select value={data.config.type || ""}
							onValueChange={(value) => updateData("type", value)}
						>
							<SelectTrigger
								id="type-selector"
							>
								<SelectValue placeholder="??" />
							</SelectTrigger>
							<SelectContent
								position="popper"
							>
								<SelectGroup>
									<SelectItem
										value="chat"
									>
										Chat
									</SelectItem>
									<SelectItem
										value="image"
									>
										Image
									</SelectItem>

								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
				</FieldSet>
				<FieldSeparator />
				<FieldSet>
					<FieldLegend>{data.config.type} Model Information</FieldLegend>
					<FieldDescription>
						Specify what your AI model should do
					</FieldDescription>

					<Field>
						<FieldLabel
							htmlFor="systemPrompt-input"
						>
							System Prompt
						</FieldLabel>
						<textarea
							value={data.config.systemPrompt || ""}
							onChange={(e) => updateData("systemPrompt", e.target.value)}
							placeholder="You are a director of my company"
							id="systemPrompt-input"
							className="h-32 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
						/>
					</Field>
					<Field>
						<FieldLabel
							htmlFor="userPrompt-input"
						>
							User Prompt
						</FieldLabel>
						<textarea
							value={data.config.userPrompt || ""}
							onChange={(e) => updateData("userPrompt", e.target.value)}
							placeholder="What does your company do?"
							id="userPrompt-input"
							className="h-32 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
						/>

						<FieldSeparator />
					</Field>
					{
						data.config.type == "image" ?
							(
								<Field>
									<FieldLabel
										htmlFor="numImages-input" >
										Number of Images to generate
									</FieldLabel>
									<Input
										value={data.config.numImages || 0}
										onChange={(e) => updateData("numImages", e.target.value)}
										placeholder="0"
										id="numImages-input"
										type="number"
									/>

								</Field>
							) :
							(
								<>
									<Field>
										<FieldLabel
											htmlFor="responseType-selector"
										>
											Model response format
										</FieldLabel>
										<Select value={data.config.responseType || ""}
											onValueChange={(value) => updateData("responseType", value)}
										>
											<SelectTrigger
												id="responseType-selector"
											>
												<SelectValue placeholder="??" />
											</SelectTrigger>
											<SelectContent
												position="popper"
											>
												<SelectGroup>
													<SelectItem
														value="text/plain"
													>
													text/plain
												</SelectItem>
												<SelectItem
													value="application/json"
												>
													application/json
												</SelectItem>

											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
					{
						data.config.responseType == "application/json" && (<Field>
							<FieldLabel
								htmlFor="responseJsonSchema-input"
							>
								Response Schema
							</FieldLabel>
							<div
								className="h-64 "
							>
								<Editor
									height={"100%"}
									value={data.config.responseJsonSchema}
									language="json"
									onChange={handleChange}
									theme={`${getColorMode() ? "vs-dark" : "light"}`}
									options={{
										minimap: {
											enabled: false
										}
									}}

								/>
							</div>
						</Field>
						)
					}
				</>
				)
					}

			</FieldSet>

		</FieldGroup>
		</div >
	)
}
