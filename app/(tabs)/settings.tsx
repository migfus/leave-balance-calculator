import ChevronDownIcon from "@/icons/chevronDownIcon"
import GithubIcon from "@/icons/githubIcon"
import TrelloIcon from "@/icons/trelloIcon"
import { useThemeStore } from "@/store/themeStore"
import React, { useState } from "react"
import {
	Image,
	Switch,
	Text,
	TouchableOpacity,
	View,
	Linking,
	TextInput,
	Alert,
	ActivityIndicator
} from "react-native"
import SendIcon from "@/icons/sendIcon"
import useBottomSheetStore from "@/store/bottomSheetStore"
import useComputationMethodStore from "@/store/computationMethodStore"

const Settings = () => {
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()
	const toggleTheme = useThemeStore((s) => s.toggleTheme)
	const $changeList = useBottomSheetStore((s) => s.changeList)
	const $computation_method = useComputationMethodStore((s) => s.method)
	const $changeComputationMethod = useComputationMethodStore(
		(s) => s.changeMethod
	)
	const $computation_method_hydrated =
		useComputationMethodStore.persist.hasHydrated()

	const [message, setMessage] = useState("")
	const [sent_message, setSentMessage] = useState(false)
	const [loading_message, setLoadingMessage] = useState(false)

	if (!theme_hydrated && !$computation_method_hydrated) {
		return
	}

	async function sendSuggestion() {
		setLoadingMessage(true)

		try {
			if (message !== "") {
				const res = await fetch("https://www.cmuohrm.site/api/feedback", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						from: "Leave Credid Balance Calculator",
						type: "Android",
						message: message
					})
				})

				if (!res.ok) {
					throw new Error(`Request failed with status ${res.status}`)
				}

				const contentType = res.headers.get("content-type") ?? ""
				if (contentType.includes("application/json")) {
					const post_data = await res.json()
					console.log("post_data", post_data)
				} else {
					const post_text = await res.text()
					console.log("post_text", post_text)
				}

				setMessage("")
				setSentMessage(true)
			}
		} catch (error) {
			console.log("post_error", error)
			Alert.alert(
				"Unable to send",
				"We couldn't send your message right now. Please try again."
			)
		}
		setLoadingMessage(false)
	}

	return (
		<View className={theme ? "bg-neutral-950" : "bg-neutral-200"}>
			<View
				className={`${theme ? "bg-neutral-900" : "bg-white"} p-6  m-4 rounded-3xl flex flex-col justify-start gap-4`}
			>
				<View className={`flex flex-row justify-start gap-4`}>
					<Image
						style={{ width: 50, height: 50, borderRadius: 10 }}
						source={require("@/assets/images/android/play_store_512.png")}
					></Image>

					<View className="grow ">
						<Text
							className={`${theme ? "text-neutral-300" : "text-brand-900"}  text-2xl font-semibold`}
						>
							Leave Credit Balance Calculator
						</Text>
						<Text
							className={`${theme ? "text-neutral-400" : "text-neutral-500"} `}
						>
							v1.1.0
						</Text>
					</View>
				</View>

				<View>
					<Text className="text-neutral-400">- Revamp UI</Text>
					<Text className="text-neutral-400">- Optimizations</Text>
				</View>

				<View className="flex flex-row gap-4">
					<TouchableOpacity
						onPress={() =>
							Linking.openURL("https://trello.com/b/URHhZk2p/lcbc-app")
						}
						className={`${theme ? "bg-neutral-800" : "bg-neutral-200"} flex flex-row gap-2  p-2 rounded-full px-4`}
					>
						<TrelloIcon color={theme ? "#b0b0b0" : "#393939"} />
						<Text
							className={`${theme ? "text-neutral-300" : "text-neutral-700"} font-semibold `}
						>
							App Updates
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`${theme ? "bg-neutral-800" : "bg-neutral-200"} flex flex-row gap-2  p-2 rounded-full px-4`}
						onPress={() =>
							Linking.openURL(
								"https://github.com/migfus/leave-balance-calculator"
							)
						}
					>
						<GithubIcon color={theme ? "#b0b0b0" : "#393939"} />
						<Text
							className={`${theme ? "text-neutral-300" : "text-neutral-700"} font-semibold `}
						>
							Open Source
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View className="mx-4 flex flex-col gap-2">
				<TouchableOpacity
					className={`${theme ? "bg-neutral-900" : "bg-white"} rounded-t-3xl rounded-b-xl p-6 `}
					onPress={toggleTheme}
				>
					<View className="flex flex-row justify-between items-center">
						<Text
							className={`${theme ? "text-neutral-300" : "text-neutral-600"} font-semibold`}
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

				<TouchableOpacity
					onPress={() =>
						$changeList([
							{
								name: "CSC Leave Credits Rule",
								link: "",
								type: "check",
								active: $computation_method === "CSC Leave Credits Rule",
								callback: () => {
									$changeComputationMethod("CSC Leave Credits Rule")
									$changeList([])
								}
							},
							{
								name: "Fixed Leave Credits Rule",
								link: "",
								type: "check",
								active: $computation_method === "Fixed Leave Credits Rule",
								callback: () => {
									$changeComputationMethod("Fixed Leave Credits Rule")
									$changeList([])
								}
							}
						])
					}
					className={`${theme ? "bg-neutral-900" : "bg-white"} rounded-xl p-6 `}
				>
					<View className="flex flex-row justify-between items-center">
						<Text
							className={`${theme ? "text-neutral-300" : "text-neutral-600"} font-semibold`}
						>
							Computation Mode
						</Text>

						<View className="flex flex-row gap-2">
							<Text className={theme ? "text-neutral-400" : "text-neutral-500"}>
								{$computation_method}
							</Text>
							<ChevronDownIcon color={theme ? "#b0b0b0" : "#393939"} />
						</View>
					</View>
				</TouchableOpacity>

				<View
					className={`${theme ? "bg-neutral-900" : "bg-white"} rounded-b-3xl rounded-t-xl p-6 `}
				>
					{sent_message ? (
						<View>
							<Text className="text-neutral-500">
								Thank you for your suggestion! 💝
							</Text>
						</View>
					) : (
						<View className="flex flex-col justify-between gap-2">
							<Text
								className={`${theme ? "text-neutral-300" : "text-neutral-600"} font-semibold mb-2`}
							>
								Suggest to Us
							</Text>

							<View
								className={`${theme ? "bg-neutral-700" : "bg-neutral-200"} rounded-3xl p-4`}
							>
								<TextInput
									className={`${theme ? "text-neutral-300 accent-neutral-300" : "text-neutral-600"}`}
									multiline
									numberOfLines={4}
									value={message}
									placeholder="Message"
									placeholderTextColor={theme ? "#b0b0b0" : "#525252"}
									onChangeText={setMessage}
								/>
							</View>

							<View className="flex flex-row justify-end">
								{loading_message ? (
									<ActivityIndicator
										size="small"
										color="#484848"
										className="bg-neutral-300 py-3 px-6 rounded-3xl"
									/>
								) : (
									<TouchableOpacity
										onPress={() => sendSuggestion()}
										className={`${
											message !== "" && theme
												? "bg-neutral-800"
												: message !== ""
													? "bg-neutral-100"
													: theme
														? "bg-neutral-900"
														: "bg-white"
										} ${theme ? "bg-neutral-800" : "bg-neutral-200"} rounded-3xl p-4 items-end flex flex-row gap-2 `}
									>
										<Text
											className={`${theme ? "text-neutral-300" : "text-neutral-700"} font-semibold `}
										>
											Send
										</Text>
										<SendIcon color={theme ? "#b0b0b0" : "#393939"} size={20} />
									</TouchableOpacity>
								)}
							</View>
						</View>
					)}
				</View>
			</View>

			<View className="p-4 bg-neutral-9050 m-4 rounded-2xl h-full"></View>
		</View>
	)
}

export default Settings
