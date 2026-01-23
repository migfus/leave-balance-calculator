import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ComputationMethod {
	method: "CSC Leave Credits Rule" | "Fixed Leave Credits Rule"
	changeMethod: (new_method: ComputationMethod["method"]) => void
}

const useComputationMethodStore = create<ComputationMethod>()(
	persist(
		(set) => ({
			method: "CSC Leave Credits Rule",

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
