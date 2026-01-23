import { IconProps } from "@/globalInterface"
import Svg, { Path } from "react-native-svg"

export default function InformationIcon({
	size = 24,
	color = "#222"
}: IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M11 9h2V7h-2m1 13c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m-1 15h2v-6h-2z"
			></Path>
		</Svg>
	)
}
