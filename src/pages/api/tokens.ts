import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, TOKENS_ENDPOINT } from '../../app/constants'

// var authOptions = {
// 	url: 'https://accounts.spotify.com/api/token',
// 	form: {
// 		code: code,
// 		redirect_uri: redirect_uri,
// 		grant_type: 'authorization_code',
// 	},
// 	headers: {
// 		Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
// 	},
// 	json: true,
// }

export async function getTokens(code: string) {
	const response = await fetch(TOKENS_ENDPOINT, {
		method: 'POST',
		body: new URLSearchParams({
			code: code,
			redirect_uri: REDIRECT_URI,
			grant_type: 'authorization_code',
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
		},
	})
	const result = await response.json()

	return result
}
