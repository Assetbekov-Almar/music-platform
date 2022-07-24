import { getCookie } from 'cookies-next'

export async function getUserProfile() {
	const token = getCookie('access_token')
	const response = await fetch(`https://api.spotify.com/v1/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const result = await response.json()

	return result
}
