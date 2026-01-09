// TODO: FIX SOME FUTURE SHITS

export function leaveBalanceComputation(data: {
	balance: string
	hours: string
	minutes: string
}): number[] {
	// CONVERT 1/480
	const computed_hours = leaveEquivalentFromCSV(Number(data.hours) * 60)
	const computed_mins = leaveEquivalentFromCSV(Number(data.minutes))
	const cost = computed_hours + computed_mins

	console.log("computed_hours", computed_hours)
	console.log("computed_min", computed_mins)

	return [cost, roundUp(Number(data.balance) - cost)]
	// return Number(data.balance) + Number(data.hours) + Number(data.minutes)
}

function roundUp(value: number, decimals = 3) {
	const factor = 10 ** decimals
	return Math.ceil(value * factor) / factor
}

function leaveEquivalentFromCSV(minutes: number) {
	// Step 1: convert input safely
	if (typeof minutes !== "number" || isNaN(minutes)) {
		return 0
	}

	// Step 2: base calculation
	const raw = minutes / 480

	// Step 3: scale for 3 decimal rounding
	const scaled = raw * 1000

	// Step 4: banker’s rounding (round half to even)
	const floor = Math.floor(scaled)
	const diff = scaled - floor

	let rounded

	if (diff > 0.5) {
		rounded = floor + 1
	} else if (diff < 0.5) {
		rounded = floor
	} else {
		// exactly .5 → round to EVEN
		rounded = floor % 2 === 0 ? floor : floor + 1
	}

	// Step 5: scale back
	return rounded / 1000
}
