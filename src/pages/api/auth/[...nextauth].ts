import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../../lib/spotify'

async function refreshAccessToken(token) {
	try {
		spotifyApi.setAccessToken(token.accessToken)
		spotifyApi.setRefreshToken(token.refreshToken)

		const { body, statusCode } = await spotifyApi.refreshAccessToken()

		if (statusCode !== 200) {
			throw body
		}

		return {
			...token,
			accessToken: body.access_token,
			accessTokenExpires: Date.now + body.expires_in * 1000,
			refreshToken: body.refresh_token ?? token.refreshToken,
		}
	} catch (error) {
		console.log(error)
		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/auth',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				}
			}

			if (Date.now() < token.accessTokenExpires) {
				return token
			}

			return await refreshAccessToken(token)
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken
			session.user.refreshToken = token.refreshToken
			session.user.username = token.username

			return session
		},
	},
})
