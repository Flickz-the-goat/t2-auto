export const getWorkflow = async (workflowId: string) => {
	const res = await fetch(`/api/workflow/getOne/${workflowId}`)

	if (!res.ok) return

	return await res.json()
}



