export function convertMsToTimeWithoutText(duration: number) {
	const minutes = Math.floor((duration / (1000 * 60)) % 60)
	const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
	const seconds = Math.floor((duration / 1000) % 60)

	if (hours === 0) {
		return minutes + ':' + seconds
	}

	return hours + ':' + minutes + ':' + seconds
}
