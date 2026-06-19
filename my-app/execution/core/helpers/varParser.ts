import test from "node:test"

export const varParser = (v: string, outputs: any, inputs?: any) => {

	const regex = new RegExp("{{[a-zA-Z0-9.\\-_]+}}", "g")
	const cleanupReg = new RegExp("([{}])", "g")

	const rawMatches = v.match(regex)
	if (!rawMatches) return

	const matches = rawMatches.map((match) => {
		return match.replace(cleanupReg, "")
	})

	console.log("Initial Matches", rawMatches)
	console.log("Cleaned up Matches", matches)

	const parsedVals = matches.map((match) => {
		const values = match.split(".")

		console.log("Working on match", match)
		console.log("Match values", values)

		return findValue(values, inputs, outputs)
	})

	let finalString = v
	for (const i in parsedVals) {
		console.log(parsedVals[i])
		finalString = finalString.replace(rawMatches[i], parsedVals[i])
	}
	console.log("Modified String: ", finalString)
}

const findValueSingle = (varsArray: string[], data: any, curr: string): any => {
	if (curr in data) {
		if (typeof data[curr] == "object" && varsArray.length != 0) {
			const next = varsArray.shift()!
			return findValueSingle(varsArray, data[curr], next)
		}
		if (typeof data[curr] == "object" && varsArray.length == 0) {
			return null
		}
		return data[curr]
	}
	return null
}
const findValue = (values: string[], inputs: any, outputs: any) => {
	const copyValues = [...values]
	let curr = values.shift()!
	const val = findValueSingle(values, inputs, curr)

	curr = copyValues.shift()!
	if (!val) return findValueSingle(copyValues, outputs, curr)
	return val
}

const inputs = {
	status: 200
}
const outputs = {
	"httpRequest-0": {
		status: 200,
		output: 700
	}
}

const testParse = "The HTTP Status Returned was: {{httpRequest-0.status}}, and the output is: {{httpRequest-0.output}}"
varParser(testParse, outputs, inputs)
