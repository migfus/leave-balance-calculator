import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function ChevronDownIcon({
	size = 24,
	color = "#fff"
}: IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill="none"
				stroke={color}
				strokeDasharray={12}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 16l-7 -7M12 16l7 -7"
			></Path>
		</Svg>
	)
}
