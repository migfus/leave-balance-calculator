import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function SendIcon({ size = 24, color = "#fff" }: IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"
			></Path>
		</Svg>
	)
}
