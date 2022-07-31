import { getCookie } from 'cookies-next'
import spotifyApi from '../../../lib/spotify'

export async function fetchTrack(searchKey = ''): Promise<{ tracks: any }> {
	const response = await spotifyApi.search(searchKey, ['track'])

	return response.body
}
