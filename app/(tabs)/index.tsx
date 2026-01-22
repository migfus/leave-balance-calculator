import HistoryPreviewCard from "@/components/cards/HistoryPreviewCard"
import KeypadCard from "@/components/cards/KeypadCard"
import ResultCard from "@/components/cards/ResultCard"
import TextInputForm from "@/components/forms/TextInputForm"
import { useLeaveHistory } from "@/store/historyStore"
import { useThemeStore } from "@/store/themeStore"
import * as Haptics from "expo-haptics"
import React, { useCallback, useRef, useState } from "react"
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native"

import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
	BottomSheetView
} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import CopyIcon from "@/icons/copyIcon"
import { IndexModal } from "@/globalInterface"
import { leaveBalanceComputation } from "@/utils"

export default function Index() {
	const [balance, setBalance] = useState<string>("0")
	const [hours, setHours] = useState<string>("0")
	const [minutes, setMinutes] = useState<string>("0")
	const [select, setSelect] = useState<string>("balance")
	const [modal_data, setModalData] = useState<IndexModal>({
		result: "0",
		cost: "0"
	})

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const handlePresentModalPress = useCallback((result_data: string[]) => {
		setModalData({
			result: result_data[0],
			cost: result_data[1]
		})
		bottomSheetModalRef.current?.present()
	}, [])
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index)
	}, [])

	const balanceInputRef = useRef<TextInput>(null)
	const hoursInputRef = useRef<TextInput>(null)
	const minutesInputRef = useRef<TextInput>(null)

	const history = useLeaveHistory((s) => s.history)
	const addHistory = useLeaveHistory((s) => s.addHistory)
	const leave_hydrated = useLeaveHistory.persist.hasHydrated()
	const theme = useThemeStore((s) => s.theme)
	const theme_hydrated = useThemeStore.persist.hasHydrated()

	if (!leave_hydrated || !theme_hydrated) {
		return (
			<View
				className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex-1 justify-center items-center`}
			>
				<ActivityIndicator size="large" className="text-brand-500" />
			</View>
		)
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<View className="flex-1">
					<View
						className={`${theme ? "bg-neutral-950" : "bg-neutral-200"} flex flex-col justify-between gap-4 p-4 h-full`}
					>
						{/* SECTION: HISTORY PREVIEW CARD */}
						<HistoryPreviewCard history={history} theme={theme} />

						{/* SECTION: RESULT CARD */}
						<ResultCard
							balance={balance}
							hours={hours}
							minutes={minutes}
							theme={theme}
							onPress={() => {
								handlePresentModalPress(
									leaveBalanceComputation({ balance, hours, minutes })
								)
							}}
						/>

						{/* SECTION: INPUT FORM */}
						<View className="flex flex-row gap-4">
							<TextInputForm
								title="Current Balance"
								value={balance}
								selected={select === "balance"}
								inputRef={balanceInputRef}
								onPressIn={() => {
									setSelect("balance")
									Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
								}}
								setValue={(value: string) => {
									setBalance(value)
								}}
								theme={theme}
								noDot={false}
							/>
						</View>

						<View className="flex flex-row gap-2">
							{/* <TextInputForm
						title="Days"
						value={hours}
						selected={select === "hours"}
						inputRef={hoursInputRef}
						onPressIn={() => {
							setSelect("hours")
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
						}}
						setValue={(value: string) => setHours(value)}
						theme={theme}
						noDot={true}
					/> */}
							<TextInputForm
								title="Hours"
								value={hours}
								selected={select === "hours"}
								inputRef={hoursInputRef}
								onPressIn={() => {
									setSelect("hours")
									Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
								}}
								setValue={(value: string) => setHours(value)}
								theme={theme}
								noDot={true}
							/>
							<TextInputForm
								title="Minutes"
								value={minutes}
								selected={select === "minutes"}
								inputRef={minutesInputRef}
								onPressIn={() => {
									setSelect("minutes")
									Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
								}}
								setValue={(value: string) => setMinutes(value)}
								theme={theme}
								noDot={true}
							/>
						</View>

						{/* SECTION: KEYPADCARD */}
						<KeypadCard
							theme={theme}
							select={select}
							balance={balance}
							hours={hours}
							minutes={minutes}
							setBalance={setBalance}
							setHours={setHours}
							addHistory={addHistory}
							setSelect={setSelect}
							setMinutes={setMinutes}
							onResetAll={() => {
								balanceInputRef.current?.focus()
							}}
						/>
					</View>
				</View>

				{/* Keep the modal mounted separately from the main view */}
				<BottomSheetModal
					ref={bottomSheetModalRef}
					onChange={handleSheetChanges}
					enablePanDownToClose
					backgroundStyle={{
						backgroundColor: theme
							? "rgba(23, 23, 23, 0.88)"
							: "rgba(245, 245, 245, 0.88)",
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24
					}}
					handleIndicatorStyle={{
						backgroundColor: theme
							? "rgba(250, 250, 250, 0.35)"
							: "rgba(10, 10, 10, 0.25)",
						width: 48
					}}
					backdropComponent={(props) => (
						<BottomSheetBackdrop
							{...props}
							appearsOnIndex={0}
							disappearsOnIndex={-1}
							opacity={theme ? 0.55 : 0.35}
						/>
					)}
				>
					<BottomSheetView className="flex flex-col gap-4 px-6 pb-10 ">
						<TouchableOpacity className="flex flex-row justify-end gap-2 items-center ">
							<Text className="text-3xl font-semibold text-brand-600">
								{modal_data.result}
							</Text>
							<CopyIcon size={24} />
						</TouchableOpacity>
						<TouchableOpacity className="flex flex-row justify-end gap-2 items-center ">
							<Text className="text-lg font-semibold text-red-600">
								{modal_data.cost}
							</Text>

							<CopyIcon size={24} color="#b32329" />
						</TouchableOpacity>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
