import { LeaveBalanceHistory } from "@/globalInterface"
import FreshIcon from "@/icons/freshIcon"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import { leaveBalanceComputation, messengerStyleTime } from "@/utils"
import {
	Alert,
	FlatList,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from "react-native"
import * as Haptics from "expo-haptics"

import React, { useMemo, useState } from "react"

const HistoryCard = ({
	history,
	onPress,
	theme
}: {
	history: LeaveBalanceHistory[]
	onPress: () => void
	theme: boolean
}) => {
	const filters = ["All", "Today", "This Week", "This Month", "This Year"]
	const [selected_filter, setSelectedFilter] = useState("All")
	const newestFirstHistory = useMemo(() => [...history].reverse(), [history])

	return (
		<View className="flex flex-1 gap-2">
			{history.length > 0 ? (
				<TouchableOpacity
					onPress={onPress}
					className={`${theme ? "bg-neutral-900" : "bg-neutral-50"} px-4 pt-4 flex justify-between items-center flex-row p-4 rounded-full`}
				>
					<FreshIcon />
					<Text
						className={`${theme ? "text-neutral-100" : "text-neutral-600"}`}
					>
						Clear History
					</Text>

					<Text
						className={`${theme ? "text-neutral-200" : "text-neutral-600"} px-2 rounded-full bg-neutral-200 text-sm`}
					>
						{history.length}
					</Text>
				</TouchableOpacity>
			) : (
				<></>
			)}

			<View className="">
				<FlatList
					data={filters}
					keyExtractor={(item) => item}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8 }}
					horizontal
					renderItem={({ item }) =>
						selected_filter === item ? (
							<View
								className={`${theme ? "bg-neutral-900" : "bg-brand-200 "} "flex flex-row justify-between py-2 px-4 rounded-full`}
							>
								<Text
									className={`${theme ? "text-neutral-500" : "text-brand-700"} text-md font-semibold`}
								>
									{item}
								</Text>
							</View>
						) : (
							<TouchableOpacity
								onPress={() => {
									setSelectedFilter(item)
								}}
								className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} "flex flex-row justify-between py-2 px-4 rounded-full`}
							>
								<Text
									className={`${theme ? "text-neutral-500" : "text-neutral-600"} text-md font-semibold`}
								>
									{item}
								</Text>
							</TouchableOpacity>
						)
					}
				></FlatList>
			</View>

			<View className="mt-4 grow">
				<FlatList
					data={newestFirstHistory}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={true}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View
							className={`${theme ? "bg-neutral-900" : "bg-neutral-100"} "flex flex-row justify-between  p-4 rounded-3xl`}
						>
							<Text
								className={`${theme ? "text-neutral-500" : "text-neutral-600"} text-xs`}
							>
								{messengerStyleTime(item.timeStamps)}
							</Text>

							<View className={`flex flex-col gap-2`}>
								<View className="flex flex-row items-end justify-end gap-1 ">
									<View className="flex flex-row items-end gap-1 justify-end ">
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md font-semibold`}
										>
											{`${item.balance}`}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-700"} text-sm`}
										>
											{`old bal `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md font-semibold`}
										>
											{`-`}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md font-semibold`}
										>
											{`${item.hours}`}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-sm`}
										>
											{`hr `}
										</Text>
										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-md font-semibold`}
										>
											{`${item.minutes}`}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-200" : "text-neutral-800"} text-sm`}
										>
											{`min `}
										</Text>

										<Text
											numberOfLines={1}
											className={`${theme ? "text-neutral-300" : "text-neutral-800"} text-md font-semibold`}
										>
											{`= `}
										</Text>
									</View>
								</View>

								<View className="flex flex-row justify-end gap-2 items-center">
									<Text
										numberOfLines={1}
										className={`text-xl font-semibold bg-red-100 text-red-700 rounded-full px-4 py-1`}
									>{`-${leaveBalanceComputation(item)[0]} `}</Text>
									<Text
										numberOfLines={1}
										className={`text-2xl font-semibold bg-brand-100 text-brand-700 rounded-full px-4 py-1`}
									>{`${leaveBalanceComputation(item)[1]} `}</Text>
								</View>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

export default function History() {
	const history = useLeaveHistory((s) => s.history)
	const hydrated = useLeaveHistory.persist.hasHydrated()
	const resetHistory = useLeaveHistory((s) => s.reset)

	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!theme_hydrated) {
		return
	}

	if (!hydrated) {
		return null
	}

	function reset() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

		console.log("resetting history")

		// React Native Web: use browser confirm/alert
		const isWeb =
			typeof window !== "undefined" && typeof window.confirm === "function"

		if (isWeb) {
			const ok = window.confirm("Clear History\n\nDo you want to continue?")
			if (!ok) return

			resetHistory()
			if (typeof window.alert === "function") {
				window.alert("History Cleared")
			}
			return
		}

		// Native: use RN Alert + ToastAndroid
		Alert.alert("Clear History", "Do you want to continue?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "OK",
				onPress: () => {
					ToastAndroid.show("History Cleared", ToastAndroid.SHORT)
					resetHistory()

					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}
			}
		])
	}

	return (
		<View
			className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 gap-4 p-4`}
		>
			<HistoryCard
				history={history}
				onPress={() => {
					reset()
				}}
				theme={theme}
			/>
		</View>
	)
}
