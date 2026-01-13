import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function XIcon({
	width = 24,
	height = 24,
	theme = false
}: IconProps) {
	return theme ? (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path
				fill="#c6c6bb"
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
			></Path>
		</Svg>
	) : (
		<Svg width={width} height={height} viewBox="0 0 24 24">
			<Path
				fill="#303030"
				d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
			></Path>
		</Svg>
	)
}
