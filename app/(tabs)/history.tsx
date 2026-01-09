import { LeaveBalanceHistory } from "@/globalInterface"
import { leaveBalanceComputation } from "@/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

const HistoryCard = ({
	history,
	onPress
}: {
	history: LeaveBalanceHistory[]
	onPress: () => void
}) => {
	return (
		<View className="flex flex-1">
			<TouchableOpacity
				onPress={onPress}
				className="px-4 pt-4 flex justify-between flex-row bg-white p-4 rounded-2xl"
			>
				<Text className="text-neutral-600">Clear History</Text>
				<Text className="text-neutral-400">{history.length}</Text>
			</TouchableOpacity>
			<View className="mt-4">
				<FlatList
					data={history}
					keyExtractor={(item) => item.timeStamps}
					scrollEnabled={false}
					contentContainerStyle={{ gap: 8 }}
					renderItem={({ item }) => (
						<View className="bg-white flex flex-row justify-end p-4 rounded-2xl">
							<View className="flex flex-row items-center">
								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.balance} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs ">
									{`bal `}
								</Text>
								<Text numberOfLines={1} className="text-neutral-400">
									{`- `}
								</Text>

								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.hours} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`hr `}
								</Text>
								<Text
									numberOfLines={1}
									className="text-neutral-400"
								>{`${item.minutes} `}</Text>
								<Text numberOfLines={1} className="text-neutral-400 text-xs">
									{`min `}
								</Text>

								<Text numberOfLines={1} className="text-neutral-400">
									{`= `}
								</Text>
							</View>

							<View className="flex flex-row">
								<Text
									numberOfLines={1}
									className="text-neutral-600 text-4xl font-semibold"
								>{`${leaveBalanceComputation(item)[1]} `}</Text>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

export default function Index() {
	const [history, setHistory] = useState<LeaveBalanceHistory[]>([])

	useEffect(() => {
		async function getHistory() {
			const history = await AsyncStorage.getItem("history")

			setHistory(history ? JSON.parse(history) : [])
		}

		getHistory()
	}, [])

	async function removeHistory() {
		await AsyncStorage.setItem("history", "")
		setHistory([])
	}

	return (
		<View className="flex flex-col justify-between h-full gap-4 p-4">
			<HistoryCard history={history} onPress={() => removeHistory()} />
		</View>
	)
}
