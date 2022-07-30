import { getCookie } from 'cookies-next'
import spotifyApi from '../../../lib/spotify'

export async function getUserProfile() {
	const result = await spotifyApi.getMe()

	return result.body
}
