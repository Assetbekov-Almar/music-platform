import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getTokens } from '../../pages/api/tokens'

const useToken = () => {
	const router = useRouter()
	const [isInit, setIsInit] = useState(false)

	useEffect(() => {
		const token = window.localStorage.getItem('access_token')
		if (token) {
			setIsInit(true)
			return
		}

		const code = router.query.code as string
		const fetchTokens = async () => {
			await getTokens(code)
			const token = window.localStorage.getItem('access_token')
			if (!token) {
				router.push('/auth')
				return
			}
			router.push('/')
			setIsInit(true)
			return
		}
		if (code) {
			fetchTokens()
		} else {
			router.push('/auth')
		}
	}, [router])

	return { isInit }
}

export default useToken
