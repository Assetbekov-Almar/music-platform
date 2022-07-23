import UserProfile from '../features/userProfile/UserProfile'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
	const [isInit, setIsInit] = useState(false)
	useEffect(() => {
		const token = window.localStorage.getItem('access_token')
		setIsInit(!!token)
	}, [])

	return (
		<>
			{isInit && <UserProfile />}
			<main>{children}</main>
		</>
	)
}
