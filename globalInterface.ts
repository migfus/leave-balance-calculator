export interface IconProps {
	width?: number
	height?: number
	color?: string
	outline?: boolean
}

export interface TabIconProps {
	children: React.ReactNode
	title: string
}

export interface LeaveBalanceHistory {
	hours: string
	minutes: string
	balance: string
	timeStamps: string
}
