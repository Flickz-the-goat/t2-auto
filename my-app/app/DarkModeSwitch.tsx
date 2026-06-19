"use client"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function DarkModeSwitch() {
	const [dark, setDark] = useState(true)

	const setColorMode = () => {
		const body = document.body
		const toast = document.querySelector(".toast")

		if (body.classList.contains("dark") && toast?.classList.contains("dark")) {
			body.classList.remove("dark")
			toast.classList.remove("dark")
			setDark(false)
		} else {
			body.classList.add("dark")
			toast?.classList.add("dark")
			setDark(true)
		}
	}

	return (
		<div className="flex items-center space-x-2 absolute bottom-4 right-2">
			<Switch
				id="dark-mode"
				checked={dark}
				onCheckedChange={setColorMode}
			/>

			<Label htmlFor="dark-mode" className={`${dark ? "text-white" : "text-black"}`}>
				{dark ? "Dark" : "Light"} Mode
			</Label>
		</div>
	)
}
