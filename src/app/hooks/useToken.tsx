import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useToken = () => {
	const router = useRouter()
	const [isInit, setIsInit] = useState(false)

	useEffect(() => {
		const hash = window.location.hash
		let token = window.localStorage.getItem('token')

		if (!token && hash) {
			token =
				hash
					.substring(1)
					.split('&')
					.find((elem) => elem.startsWith('access_token'))
					?.split('=')[1] || ''
			window.location.hash = ''
			window.localStorage.setItem('token', token)
		}

		if (!token) {
			router.push('/auth')
			return
		}
		setIsInit(true)
	}, [router])

	return { isInit }
}

export default useToken
