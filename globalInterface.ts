export interface IconProps {
	size?: number
	color?: string
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

export interface IndexModal {
	cost: string
	result: string
}
