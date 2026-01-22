import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ComputationMethod {
	method: "Civil Service Method" | "Fixed Leave Credit Method"
	changeMethod: (new_method: ComputationMethod["method"]) => void
}

const useComputationMethodStore = create<ComputationMethod>()(
	persist(
		(set) => ({
			method: "Civil Service Method",

			changeMethod: (new_method: ComputationMethod["method"]) => {
				set({ method: new_method })
			}
		}),
		{
			name: "computation-method",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
)

export default useComputationMethodStore
