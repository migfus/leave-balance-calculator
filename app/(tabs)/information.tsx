import CollapseCard from "@/components/cards/CollapseCard"
import { useThemeStore } from "@/store/themeStore"
import React from "react"
import { Text, View, ScrollView } from "react-native"

const Information = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!theme_hydrated) {
		return
	}

	const informations = [
		{
			title: "CSC Leave Credits Rule",
			sub_title: "Basd on Civil Service Commission computation",
			more_info: {
				title: "Conversion of Working Hours/Minutess into Fraction of a Day",
				sub_title: "Based on 8 Hours Workday",
				links: [
					{
						name: "Omnibus Rule On Leave.pdf",
						link: "https://trd.zamitsolutions.net/resources/zSf5MJdW.pdf"
					}
				]
			}
		},
		{
			title: "Fixed Leave Credits Rule",
			sub_title: "Based on 1/480 computation",
			more_info: {
				title: "Based on 1 minute = 1/480.",
				sub_title: "No longer strictly follows on Civil Service Commission rule"
			}
		}
	]

	const conversion_rate = [
		{
			title: "8 hr undertime",
			csc: "1.000",
			fixed: "1.000"
		},
		{
			title: "7 hr undertime",
			csc: "0.875",
			fixed: "0.875"
		},
		{
			title: "6 hr undertime",
			csc: "0.750",
			fixed: "0.750"
		},
		{
			title: "5 hr undertime",
			csc: "0.625",
			fixed: "0.625"
		},
		{
			title: "4 hr undertime",
			csc: "0.500",
			fixed: "0.500"
		},
		{
			title: "3 hr undertime",
			csc: "0.375",
			fixed: "0.375"
		},
		{
			title: "2 hr undertime",
			csc: "0.250",
			fixed: "0.250"
		},
		{
			title: "1 hr undertime",
			csc: "0.125",
			fixed: "0.125"
		},
		{
			title: "60 min undertime",
			csc: "0.125",
			fixed: "0.125"
		},
		{
			title: "59 min undertime",
			csc: "0.123",
			fixed: "0.123"
		},
		{
			title: "58 min undertime",
			csc: "0.121",
			fixed: "0.121"
		},
		{
			title: "57 min undertime",
			csc: "0.119",
			fixed: "0.119"
		},
		{
			title: "56 min undertime",
			csc: "0.117",
			fixed: "0.117"
		},
		{
			title: "55 min undertime",
			csc: "0.115",
			fixed: "0.115"
		},
		{
			title: "54 min undertime",
			csc: "0.112",
			fixed: "0.113"
		},
		{
			title: "53 min undertime",
			csc: "0.110",
			fixed: "0.110"
		},
		{
			title: "52 min undertime",
			csc: "0.108",
			fixed: "0.108"
		},
		{
			title: "51 min undertime",
			csc: "0.106",
			fixed: "0.106"
		},
		{
			title: "50 min undertime",
			csc: "0.104",
			fixed: "0.104"
		},
		{
			title: "49 min undertime",
			csc: "0.102",
			fixed: "0.102"
		},
		{
			title: "48 min undertime",
			csc: "0.100",
			fixed: "0.100"
		},
		{
			title: "47 min undertime",
			csc: "0.098",
			fixed: "0.098"
		},
		{
			title: "46 min undertime",
			csc: "0.096",
			fixed: "0.096"
		},
		{
			title: "45 min undertime",
			csc: "0.094",
			fixed: "0.094"
		},
		{
			title: "44 min undertime",
			csc: "0.092",
			fixed: "0.092"
		},
		{
			title: "43 min undertime",
			csc: "0.090",
			fixed: "0.090"
		},
		{
			title: "42 min undertime",
			csc: "0.087",
			fixed: "0.088"
		},
		{
			title: "41 min undertime",
			csc: "0.085",
			fixed: "0.085"
		},
		{
			title: "40 min undertime",
			csc: "0.083",
			fixed: "0.083"
		},
		{
			title: "39 min undertime",
			csc: "0.081",
			fixed: "0.081"
		},
		{
			title: "38 min undertime",
			csc: "0.079",
			fixed: "0.079"
		},
		{
			title: "37 min undertime",
			csc: "0.077",
			fixed: "0.077"
		},
		{
			title: "36 min undertime",
			csc: "0.075",
			fixed: "0.075"
		},
		{
			title: "35 min undertime",
			csc: "0.073",
			fixed: "0.073"
		},
		{
			title: "34 min undertime",
			csc: "0.071",
			fixed: "0.071"
		},
		{
			title: "33 min undertime",
			csc: "0.069",
			fixed: "0.069"
		},
		{
			title: "32 min undertime",
			csc: "0.067",
			fixed: "0.067"
		},
		{
			title: "31 min undertime",
			csc: "0.065",
			fixed: "0.065"
		},
		{
			title: "30 min undertime",
			csc: "0.062",
			fixed: "0.063"
		},
		{
			title: "29 min undertime",
			csc: "0.060",
			fixed: "0.060"
		},
		{
			title: "28 min undertime",
			csc: "0.058",
			fixed: "0.058"
		},
		{
			title: "27 min undertime",
			csc: "0.056",
			fixed: "0.056"
		},
		{
			title: "26 min undertime",
			csc: "0.054",
			fixed: "0.054"
		},
		{
			title: "25 min undertime",
			csc: "0.052",
			fixed: "0.052"
		},
		{
			title: "24 min undertime",
			csc: "0.050",
			fixed: "0.050"
		},
		{
			title: "23 min undertime",
			csc: "0.048",
			fixed: "0.048"
		},
		{
			title: "22 min undertime",
			csc: "0.046",
			fixed: "0.046"
		},
		{
			title: "21 min undertime",
			csc: "0.044",
			fixed: "0.044"
		},
		{
			title: "20 min undertime",
			csc: "0.042",
			fixed: "0.042"
		},
		{
			title: "19 min undertime",
			csc: "0.040",
			fixed: "0.040"
		},
		{
			title: "18 min undertime",
			csc: "0.037",
			fixed: "0.038"
		},
		{
			title: "17 min undertime",
			csc: "0.035",
			fixed: "0.035"
		},
		{
			title: "16 min undertime",
			csc: "0.033",
			fixed: "0.033"
		},
		{
			title: "15 min undertime",
			csc: "0.031",
			fixed: "0.031"
		},
		{
			title: "14 min undertime",
			csc: "0.029",
			fixed: "0.029"
		},
		{
			title: "13 min undertime",
			csc: "0.027",
			fixed: "0.027"
		},
		{
			title: "12 min undertime",
			csc: "0.025",
			fixed: "0.025"
		},
		{
			title: "11 min undertime",
			csc: "0.023",
			fixed: "0.023"
		},
		{
			title: "10 min undertime",
			csc: "0.021",
			fixed: "0.021"
		},
		{
			title: "9 min undertime",
			csc: "0.019",
			fixed: "0.019"
		},
		{
			title: "8 min undertime",
			csc: "0.017",
			fixed: "0.017"
		},
		{
			title: "7 min undertime",
			csc: "0.015",
			fixed: "0.016"
		},
		{
			title: "6 min undertime",
			csc: "0.012",
			fixed: "0.013"
		},
		{
			title: "5 min undertime",
			csc: "0.010",
			fixed: "0.010"
		},
		{
			title: "4 min undertime",
			csc: "0.008",
			fixed: "0.008"
		},
		{
			title: "3 min undertime",
			csc: "0.006",
			fixed: "0.006"
		},
		{
			title: "2 min undertime",
			csc: "0.004",
			fixed: "0.004"
		},
		{
			title: "1 min undertime",
			csc: "0.002",
			fixed: "0.002"
		}
	]

	return (
		<View className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1`}>
			<ScrollView
				className="gap-2 py-4"
				contentContainerStyle={{ paddingBottom: 24, gap: 8 }}
				showsVerticalScrollIndicator={false}
			>
				{informations.map((item, index) => {
					return (
						<View key={index} className="px-4">
							<CollapseCard
								title={item.title}
								sub_title={item.sub_title}
								more_info={item.more_info}
							/>
						</View>
					)
				})}

				{conversion_rate.map((item, index) => {
					return (
						<View key={index} className="px-4">
							<View
								className={`${index === 0 ? "rounded-t-3xl" : "rounded-t-xl"} ${index === conversion_rate.length - 1 ? "rounded-b-3xl" : "rounded-b-xl"} ${theme ? "bg-neutral-900" : "bg-white"}  p-6 flex flex-row gap-2 justify-between`}
							>
								<Text
									className={`${theme ? "text-neutral-300" : " text-neutral-600"} font-semibold`}
								>
									{item.title}
								</Text>

								{item.csc === item.fixed ? (
									<View className="flex flex-row gap-2">
										<View
											className={`${theme ? "bg-red-800" : "bg-red-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`CSC & Fixed`}
											</Text>
											<Text
												className={`${theme ? "text-red-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`-${item.csc}`}
											</Text>
										</View>
									</View>
								) : (
									<View className="flex flex-row gap-2">
										<View
											className={`${theme ? "bg-red-800" : "bg-red-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${theme ? "text-red-100" : "text-red-700"} font-semibold text-sm`}
											>
												{`CSC`}
											</Text>
											<Text
												className={`${theme ? "text-red-100" : "text-red-700"} font-semibold text-sm`}
											>
												{`-${item.csc}`}
											</Text>
										</View>

										<View
											className={`${theme ? "bg-orange-800" : "bg-orange-50"} items-center flex flex-row gap-2  px-3 py-1 rounded-full`}
										>
											<Text
												className={`${theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`Fixed`}
											</Text>
											<Text
												className={`${theme ? "text-orange-100" : "text-orange-700"} font-semibold text-sm`}
											>
												{`-${item.fixed}`}
											</Text>
										</View>
									</View>
								)}
							</View>
						</View>
					)
				})}
			</ScrollView>
		</View>
	)
}

export default Information
