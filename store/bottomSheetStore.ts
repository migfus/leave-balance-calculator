import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import * as Haptics from "expo-haptics"

interface ThemeStore {
	list: {
		name: string
		icon: string
		link: string
	}[]
}

const useBottomSheetStore = create<ThemeStore>((set) => ({
	list: [],
	addList: () => set((state: ThemeStore[]) => ({ list: state }))
}))

export default useBottomSheetStore
