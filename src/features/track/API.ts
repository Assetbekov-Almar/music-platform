export async function fetchTrack(searchKey = ''): Promise<{ tracks: any }> {
	const token = window.localStorage.getItem('token')
	const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchKey}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const result = await response.json()

	return result
}
