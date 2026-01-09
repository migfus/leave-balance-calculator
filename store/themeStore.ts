import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ThemeStore {
	theme: boolean
	toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			theme: false,

			toggleTheme: () => set({ theme: !get().theme })
		}),
		{
			name: "theme-store",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
)
