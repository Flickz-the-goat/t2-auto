import { NodeHandlerType } from "@/execution/core/types"
import { geminiNodeType } from "./type"
import { GoogleGenAI } from '@google/genai';

export const HandleGemini: NodeHandlerType = async (nodeData) => {
	try {
		const aiNode = nodeData as geminiNodeType
		let res;

		if (aiNode.config.type == "chat") {
			res = await handleChat(aiNode)
		}
		else if (aiNode.config.type == "image") {
			res = await handleImage(aiNode)
		}

		return {
			status: "Success",
			output: res
		}
	}
	catch (e) {
		const err = e as Error
		console.log(err)

		return {
			status: "Failed",
			output: e,
			errorMessage: err.message
		}
	}
}

const handleChat = async (nodeData: geminiNodeType) => {
	const gemini = new GoogleGenAI({ apiKey: nodeData.config.apiKey })
	if (!gemini) throw new Error("Gemini Model could not be created")

	const res = await gemini.models.generateContent({
		model: "gemini-2.5-flash",
		contents: nodeData.config.userPrompt,
		config: {
			responseMimeType: nodeData.config.responseType,
			responseJsonSchema: JSON.parse(nodeData.config.responseJsonSchema ?? "") ?? null,
			systemInstruction: nodeData.config.systemPrompt ?? ""
		}
	})
	return res.text
}


const handleImage = async (nodeData: geminiNodeType) => {
	const gemini = new GoogleGenAI({ apiKey: nodeData.config.apiKey })

	if (!gemini) throw new Error("Gemini Model could not be created")

	const res = await gemini.models.generateImages({
		model: "gemini-3.1-flash-image",
		prompt: nodeData.config.userPrompt,
		config: { numberOfImages: nodeData.config.numImages ?? 1 }
	})

	const imageBytes = res.generatedImages?.[0]?.image?.imageBytes;
	if (!imageBytes) {
		throw new Error("No image data returned from the generation service.");
	}
	console.log(imageBytes)

	return imageBytes;
}
