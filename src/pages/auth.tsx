import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AUTH } from '../app/constants'

const Auth = () => {
	const router = useRouter()
	const [isInit, setIsInit] = useState(false)

	useEffect(() => {
		const token = window.localStorage.getItem('access_token')
		if (token) {
			router.push('/')
			return
		}
		setIsInit(true)
	}, [router])

	if (!isInit) return <div>Loading</div>

	return <a href={AUTH}>Log in</a>
}

export default Auth
