import '../styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../app/store'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
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
	}, [])

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}
