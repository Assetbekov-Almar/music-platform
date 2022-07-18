export async function fetchUserTracks(): Promise<{ items: any }> {
	const token = window.localStorage.getItem('token')
	const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const result = await response.json()

	return result
}
