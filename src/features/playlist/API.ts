import spotifyApi from '../../../lib/spotify'

export async function getPlaylist(playlistId) {
	const result = await spotifyApi.getPlaylist(playlistId)

	return result.body
}
