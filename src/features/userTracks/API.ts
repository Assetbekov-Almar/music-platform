export async function fetchUserTracks() {
	// const token = window.localStorage.getItem('access_token')
	const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
		headers: {
			Authorization: `Bearer BQAQ6qjXLpiDRA6qzFxiD6OCKXguCdwYqrSki_AMntOHhiinbBm80B5ZwnTfRbOuDobpPadCGqb_rcCQL1v2BCHdPJnKmlIi32sC4fyvI-pqgskuGoyWmw9plJiXfgkdxFrxzlLxmVY_Y_gOT_Wx90qG6YB-dWZBteajptOZo_jsoaTs6hcjz7DeHca3NS40b796A0aMDP0OTRU`,
		},
	})
	const result = await response.json()

	return result
}
