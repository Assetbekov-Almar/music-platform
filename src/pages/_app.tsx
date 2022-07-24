import '../styles/globals.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../app/store'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<SessionProvider session={pageProps.session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</Provider>
	)
}
