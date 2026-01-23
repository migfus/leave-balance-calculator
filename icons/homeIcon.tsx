import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function HomeIcon({ size = 27, color = "#222" }: IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75"
			></Path>
		</Svg>
	)
}
