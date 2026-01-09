import { LeaveBalanceHistory } from "@/globalInterface"
import { leaveBalanceComputation } from "@/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Haptics from "expo-haptics"
import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

const HistoryCard = ({ history }: { history: LeaveBalanceHistory[] }) => {
	return (
		<View className="bg-white rounded-2xl flex flex-1">
			<View className="px-4 pt-4 rounded-2xl flex justify-between flex-row">
				<Text className="text-neutral-600">History</Text>
				<Text className="text-neutral-400">99+</Text>
			</View>
			<View className="p-4">
				<FlatList
					data={history}
					keyExtractor={(item) => item.timeStamps}
					renderItem={({ item }) => (
						<View className="flex flex-row justify-end">
							<View className="flex flex-row items-end">
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
									className="text-neutral-600"
								>{`${leaveBalanceComputation(item)[1]} `}</Text>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</View>
	)
}

const ResultCard = (result: {
	balance: string
	hours: string
	minutes: string
}) => {
	return (
		<View className=" rounded-2xl flex flex-col justify-between p-2 flex-none">
			<Text className="text-neutral-600">Result</Text>
			<View className="flex flex-row justify-end items-end">
				{leaveBalanceComputation(result)[0] ? (
					<Text
						numberOfLines={1}
						className="text-right text-red-700 text-xl font-bold "
					>
						{`-${leaveBalanceComputation(result)[0]}   `}
					</Text>
				) : (
					<></>
				)}

				<Text
					numberOfLines={1}
					className="text-right text-neutral-700 text-4xl font-bold "
				>
					{`${leaveBalanceComputation(result)[1]} `}
				</Text>
				<Text
					numberOfLines={1}
					className="text-right text-neutral-700 text-md "
				>
					bal
				</Text>
			</View>
		</View>
	)
}

const InputCard = ({
	title,
	value,
	full,
	selected,
	onPressIn,
	error
}: {
	title: string
	value: string
	full: boolean
	selected: boolean
	onPressIn: () => void
	error: boolean
}) => {
	return (
		<View className={full ? "grow overflow-x-hidden" : "flex-none"}>
			<View className="px-2 pb-1 rounded-2xl flex justify-between flex-row">
				<Text className="text-neutral-600 ">{title}</Text>
			</View>
			<TouchableOpacity
				className={`${error ? "border border-red-300 bg-red-50" : selected ? "border border-neutral-300" : ""} p-4 bg-white rounded-2xl h-16`}
				onPressIn={() => onPressIn()}
			>
				<Text
					numberOfLines={1}
					className={`${error ? "text-red-800" : "text-neutral-700"} text-right text-2xl font-bold `}
				>
					{value}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")
	const [history, setHistory] = useState<LeaveBalanceHistory[]>([])

	const [balanceError, setBalanceError] = useState<boolean>(false)
	const [hoursError, setHoursError] = useState<boolean>(false)
	const [minutesError, setMinutesError] = useState<boolean>(false)

	async function saveHistory(new_history: LeaveBalanceHistory) {
		if (
			new_history.balance !== "0" &&
			(new_history.hours !== "0" || new_history.minutes !== "0")
		) {
			const currentHistory = await AsyncStorage.getItem("history")
			const updatedHistory = currentHistory ? JSON.parse(currentHistory) : []
			updatedHistory.push(new_history)
			setHistory(updatedHistory)
			await AsyncStorage.setItem("history", JSON.stringify(updatedHistory))
		}
	}

	useEffect(() => {
		async function getHistory() {
			const history = await AsyncStorage.getItem("history")

			setHistory(history ? JSON.parse(history) : [])
		}

		getHistory()
	}, [])

	function append(v: string) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

		switch (select) {
			case "balance":
				if (v === "." && balance.includes(".")) return
				if (balance === "0" && v !== ".") {
					setBalance(v)
				} else {
					setBalance((s) => s + v)
				}
				break
			case "hours":
				if (v === ".") return
				if (hours === "0" && v !== ".") {
					setHours(v)
				} else {
					setHours((s) => s + v)
				}
				break
			case "minutes":
				if (v === ".") return
				if (minutes === "0" && v !== ".") {
					setMinutes(v)
				} else {
					setMinutes((s) => s + v)
				}
				break
		}
	}

	function reset() {
		saveHistory({
			balance,
			hours,
			minutes,
			timeStamps: new Date().toISOString()
		})
		setBalance("0")
		setHours("0")
		setMinutes("0")
		setSelect("balance")
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
	}

	function clear() {
		switch (select) {
			case "balance":
				setBalance("0")
				break
			case "hours":
				setHours("0")
				break
			case "minutes":
				setMinutes("0")
				break
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	function del() {
		switch (select) {
			case "balance":
				setBalance((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
			case "hours":
				setHours((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
			case "minutes":
				setMinutes((s) => (s.length > 1 ? s.slice(0, -1) : "0"))
				break
		}
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	const rows = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["Del", "0", "."],
		["Reset All", "Clear"]
	]

	return (
		<View className="flex flex-col justify-between h-full gap-4 p-4">
			<HistoryCard history={history} />
			<ResultCard balance={balance} hours={hours} minutes={minutes} />
			<InputCard
				title="Balance"
				value={balance}
				full={false}
				selected={select === "balance"}
				onPressIn={() => {
					setSelect("balance")
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
				}}
				error={balanceError}
			/>
			<View className="flex flex-row gap-4">
				<InputCard
					title="Hours"
					value={hours}
					full={true}
					selected={select === "hours"}
					onPressIn={() => {
						setSelect("hours")
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
					}}
					error={hoursError}
				/>
				<InputCard
					title="Minutes"
					value={minutes}
					full={true}
					selected={select === "minutes"}
					onPressIn={() => {
						setSelect("minutes")
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
					}}
					error={minutesError}
				/>
			</View>

			<View className="flex-none">
				{rows.map((row, ri) => (
					<View key={ri} className="flex-row justify-between mb-3">
						{row.map((b, bi) => {
							const onPress = () => {
								setBalanceError(false)
								setHoursError(false)
								setMinutesError(false)

								if (b === "Reset All") reset()
								else if (b === "Del") del()
								else if (b === "Clear") clear()
								else append(b)
							}

							return (
								<TouchableOpacity
									key={bi}
									onPressIn={onPress}
									activeOpacity={0.7}
									className={`bg-white rounded-2xl justify-center items-center flex-1 h-[5rem] mx-1`}
								>
									<Text className={`text-neutral-800 font-semibold text-2xl`}>
										{b}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				))}
			</View>
		</View>
	)
}
