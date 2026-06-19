"use client"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Tooltip } from "@/components/ui/tooltip"
import Editor from "@monaco-editor/react"
import { ArrowLeft, ArrowRight, DatabaseSearch, DatabaseZap, Plus, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function PanelEditor({ data, type, setAction }: { data: any, type: string, setAction: any }) {
	const [inputString, setInputString] = useState(
		JSON.stringify(
			data,
			null,
			2
		)
	)
	const readOnly = type == "output" ? true : false
	const handleChange = (val?: any) => {
		setInputString(val || "")
	}

	useEffect(() => {
		setInputString(JSON.stringify(
			data,
			null,
			2
		))
	}, [data])

	if (inputString === "null") {
		return (
			<div>
				{

					type == "input" ?
						(
							<InputSteps setInputString={setInputString} />
						) :
						(
							<OutputSteps />
						)
				}
			</div>

		)
	}

	const getColorMode = () => {
		return document.body.classList.contains("dark")
	}


	const save = () => {
		try {
			setAction(JSON.parse(inputString))
		}
		catch (e) {
			const err = e as Error
			toast.error(`Error Saving: ${err.message}`);
		}
	}

	return (
		<div className="h-full w-full relative">
			<Editor height={"100%"}
				value={inputString}
				language="json"
				onChange={handleChange}
				theme={`${getColorMode() ? "vs-dark" : "light"}`}
				options={{
					readOnly: readOnly,
					minimap: {
						enabled: false
					}
				}}
			/>
			<Tooltip>
				<Button size={"icon-sm"}
					className="absolute z-50 top-2 right-6 shadow-sm"
					onClick={() => save()}
				>
					<Save />
				</Button>
			</Tooltip>
		</div>
	)
}

function OutputSteps() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant={"icon"}>
					<DatabaseZap />
				</EmptyMedia>
				<EmptyTitle>No Output Data </EmptyTitle>
				<EmptyDescription>
					No output data availaible,
					first execute this node
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex justify-center gap-2">
				<Button size={"sm"}>
					Execute Node <ArrowRight />
				</Button>
			</EmptyContent>
		</Empty>

	)
}
function InputSteps({ setInputString }: { setInputString: any }) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant={"icon"}>
					<DatabaseSearch />
				</EmptyMedia>
				<EmptyTitle>No Input Data </EmptyTitle>
				<EmptyDescription>
					No input data availaible, first run past nodes,
					or add your own test data.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex justify-center gap-2">
				<Button size={"sm"}>
					<ArrowLeft /> Execute Previous Nodes
				</Button>
				<Button size={"sm"} variant={"secondary"}
					onClick={() => setInputString("{\n\n}")}
				>
					<Plus /> Add Test Data
				</Button>

			</EmptyContent>
		</Empty>
	)
}
