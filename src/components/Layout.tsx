import UserProfile from '../features/userProfile/UserProfile'
import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import spotifyApi from '../../lib/spotify'

export default function Layout({ children }) {
	const { data: session, status } = useSession()
	const router = useRouter()
	useEffect(() => {
		console.log(session)
		if (session?.error === 'RefreshAccessTokenError') {
			signOut()
		}
		if (session?.user?.accessToken) spotifyApi.setAccessToken(session.user.accessToken)
	}, [session, router])

	return (
		<>
			{status === 'authenticated' && <UserProfile />}
			<main>{children}</main>
		</>
	)
}
