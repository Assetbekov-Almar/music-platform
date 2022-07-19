import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, TOKENS_ENDPOINT } from '../../app/constants'

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
	if (response.status === 200) {
		const result = await response.json()
		const { access_token, refresh_token } = result
		window.localStorage.setItem('access_token', access_token)
		window.localStorage.setItem('refresh_token', refresh_token)
	}
}
