export function convertMsToTime(duration: number) {
	const minutes = Math.floor((duration / (1000 * 60)) % 60)
	const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
	const seconds = Math.floor((duration / 1000) % 60)

	if (hours === 0) {
		return minutes + ' min ' + (seconds < 9 ? '0' + seconds : seconds) + ' sec'
	}

	return hours + ' hr ' + minutes + ' min'
}
