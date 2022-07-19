import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getTokens } from '../../pages/api/tokens'

const useToken = () => {
	const router = useRouter()
	const [isInit, setIsInit] = useState(false)

	useEffect(() => {
		const code = router.query.code as string
		const fetchTokens = async () => {
			const tokens = await getTokens(code)
			console.log(tokens)
		}
		if (code) {
			fetchTokens()
		}
		const hash = window.location.hash
		let token = window.localStorage.getItem('token')

		if (!token && hash) {
			token =
				hash
					.substring(1)
					.split('&')
					.find((elem) => elem.startsWith('code'))
					?.split('=')[1] || ''
			window.location.hash = ''
			window.localStorage.setItem('code', token)
		}

		if (!token) {
			// router.push('/auth')
			return
		}
		setIsInit(true)
	}, [router])

	return { isInit }
}

export default useToken
