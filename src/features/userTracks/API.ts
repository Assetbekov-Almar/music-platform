import { getCookie } from 'cookies-next'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

export async function fetchUserTracks(req: IncomingMessage & { cookies: NextApiRequestCookies }, res: ServerResponse) {
	const token = getCookie('access_token', { req, res })
	const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	const result = await response.json()

	return result
}
