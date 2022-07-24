import UserProfile from '../features/userProfile/UserProfile'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

export default function Layout({ children }) {
	const [isInit, setIsInit] = useState(false)
	useEffect(() => {
		const token = getCookie('access_token')
		setIsInit(!!token)
	}, [])

	return (
		<>
			{isInit && <UserProfile />}
			<main>{children}</main>
		</>
	)
}
