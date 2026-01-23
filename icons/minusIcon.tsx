import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function MinusIcon({ size = 24, color = "#222" }: IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path fill={color} d="M19 12.998H5v-2h14z"></Path>
		</Svg>
	)
}
