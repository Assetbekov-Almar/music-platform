import { getCookie } from 'cookies-next'
import spotifyApi from '../../../lib/spotify'

export async function getUserProfile() {
	const result = await spotifyApi.getMe()

	console.log(result)

	return result
}
