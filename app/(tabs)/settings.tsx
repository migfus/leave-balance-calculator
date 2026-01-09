import { useThemeStore } from "@/store/themeStore"
import React from "react"
import { Switch, Text, TouchableOpacity, View } from "react-native"

const Settings = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()
	const toggleTheme = useThemeStore((s) => s.toggleTheme)

	if (!theme_hydrated) {
		return
	}

	return (
		<TouchableOpacity
			className={`${theme ? "bg-neutral-900" : "bg-white"} m-4 rounded-2xl p-4 `}
			onPress={toggleTheme}
		>
			<View className="flex flex-row justify-between items-center">
				<Text
					className={`${theme ? "text-neutral-50" : "text-neutral-600"} font-semibold`}
				>
					Dark Mode
				</Text>

				<Switch
					value={theme}
					onValueChange={() => toggleTheme()}
					trackColor={{ false: "#ccc", true: "#4ade80" }}
					thumbColor={theme ? "#22c55e" : "#f4f4f5"}
					style={{ height: 32, width: 32 }}
				/>
			</View>
		</TouchableOpacity>
	)
}

export default Settings
