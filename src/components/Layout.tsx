import UserProfile from '../features/userProfile/UserProfile'
import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import spotifyApi from '../../lib/spotify'

export default function Layout({ children }) {
	const { data: session, status } = useSession()
	const router = useRouter()
	useEffect(() => {
		if (session?.error === 'RefreshAccessTokenError') {
			signOut()
			return
		}
		spotifyApi.setAccessToken(session?.user?.accessToken)
	}, [session, router])

	return (
		<>
			{spotifyApi.getAccessToken() && status === 'authenticated' && <UserProfile />}
			<main>{children}</main>
		</>
	)
}
