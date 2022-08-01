import UserProfile from '../features/userProfile/UserProfile'
import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import spotifyApi from '../../lib/spotify'
import Sidebar from '../features/sidebar/Sidebar'
import styles from '../styles/Layout.module.scss'
import Footer from './Footer'

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

	if (status === 'loading') return <div>Loading...</div>

	return (
		<div className={styles.container}>
			{spotifyApi.getAccessToken() && status === 'authenticated' && (
				<>
					<Sidebar />
					<UserProfile />
					<Footer />
				</>
			)}
			<main className={styles.main}>{children}</main>
		</div>
	)
}
