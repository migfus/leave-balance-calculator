import React from "react"

import { TabIconProps } from "@/globalInterface"
import { Text, View } from "react-native"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import History from "./history"
import Index from "./index"
import Settings from "./settings"

const Tab = createMaterialTopTabNavigator()

const TabIcon = ({ children, title }: TabIconProps) => {
	return (
		// I cannot expand the view
		<View className="flex items-center">
			{children}
			<Text style={{ fontSize: 12, marginTop: 4 }}>{title}</Text>
		</View>
	)
}

const _Layout = () => {
	return (
		<SafeAreaView className="bg-white h-full">
			<Tab.Navigator
				screenOptions={{
					tabBarIndicatorStyle: { backgroundColor: "#000" },
					tabBarLabelStyle: { fontSize: 12 },
					tabBarStyle: { backgroundColor: "#fff" }
				}}
			>
				<Tab.Screen name="Home" component={Index} />
				<Tab.Screen name="History" component={History} />
				<Tab.Screen name="Settings" component={Settings} />
			</Tab.Navigator>

			<StatusBar style="dark" />
		</SafeAreaView>
	)
}

export default _Layout
