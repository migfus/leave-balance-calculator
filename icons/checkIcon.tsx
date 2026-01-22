import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"
import { useThemeStore } from "@/store/themeStore"

export default function CheckIcon({ size = 24, color = "#222" }: IconProps) {
	const theme = useThemeStore((s) => s.theme)

	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={theme ? "#fff" : "#000"}
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
			></Path>
		</Svg>
	)
}
