import spotifyApi from '../../../lib/spotify'

export async function getUserPlaylists() {
	const result = await spotifyApi.getUserPlaylists()

	return result.body.items
}
