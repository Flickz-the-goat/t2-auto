import { create } from "zustand"

interface NodePanelStore {
	selectedNodeId: string | null
	open: boolean

	openNode: (id: string) => void
	close: () => void
}

export const useNodePanel = create<NodePanelStore>((set) => ({
	selectedNodeId: null,
	open: false,

	openNode: (id) =>
		set({
			selectedNodeId: id,
			open: true,
		}),

	close: () =>
		set({
			selectedNodeId: null,
			open: false,
		}),
}))

