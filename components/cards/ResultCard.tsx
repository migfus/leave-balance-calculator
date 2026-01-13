import { leaveBalanceComputation } from "@/utils"
import React from "react"
import { Text, View } from "react-native"

const ResultCard = ({
	balance,
	hours,
	minutes,
	theme = false
}: {
	balance: string
	hours: string
	minutes: string
	theme?: boolean
}) => {
	const result = { balance, hours, minutes }
	const new_balance = leaveBalanceComputation(result)

	return (
		<View className=" rounded-2xl flex flex-col justify-between p-2 flex-none">
			<Text className={`${theme ? "text-neutral-50" : "text-neutral-600"}`}>
				Result
			</Text>
			<View className="flex flex-col justify-end items-end gap-2">
				<View className="flex flex-row items-end gap-1">
					<View className="flex flex-row items-end">
						<Text
							numberOfLines={1}
							className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-4xl font-bold`}
						>
							{`${new_balance[1].split(".")[0]}.`}
						</Text>
						<Text
							numberOfLines={1}
							className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-3xl font-bold`}
						>
							{`${new_balance[1].split(".")[1]}`}
						</Text>
					</View>

					<Text
						numberOfLines={1}
						className={`${theme ? "text-neutral-50" : "text-neutral-700"} text-right text-md`}
					>
						new bal
					</Text>
				</View>

				<View className="flex flex-row items-end gap-1">
					<View className="flex flex-row items-end">
						<Text
							numberOfLines={1}
							className="text-right text-red-700 font-bold text-2xl"
						>
							{`${new_balance[0] === "0.000" ? "0" : "-" + new_balance[0].split(".")[0]}.`}
						</Text>
						<Text
							numberOfLines={1}
							className="text-right text-red-700 font-bold text-xl"
						>
							{`${new_balance[0].split(".")[1] === "0" ? "0" : new_balance[0].split(".")[1]}`}
						</Text>
					</View>

					<Text numberOfLines={1} className={`text-red-700 text-right`}>
						cost bal
					</Text>
				</View>
			</View>
		</View>
	)
}
export default ResultCard
